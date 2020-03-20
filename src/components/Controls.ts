// Factory Imports
import CreateElement from './ui/ElementFactory';
import CreateButton from './ui/form/Button';
import CreateInput from './ui/form/Input';

import {UpdateWidgetSettingsFn} from './storage/WidgetStorage';

// Helper Functions
import {ConvertHEXtoRGB, CheckRGBValue, InvertColor, ClampRGB} from './helpers/ColorFunctions';

// Interface for the Control Class
interface ControlInterface {
    ChangeWidgetDisplay: (display: string) => void;
    MoveWidget: (position: Position) => void;
    ChangeBackgroundColor: (color: string) => void;
    SetCustomCommand: (cmd: string) => void;
}

interface ControlProps {
    logger: (msg: string) => void;
    setWidgetSetting: UpdateWidgetSettingsFn;
    playOutCommandFn: PlayoutCommandFn;
    widget: HTMLDivElement;
}
// Interface for the widget's position on screen
interface Position {x: number, y: number}
interface PlayoutCommandFn {
    (cmd: string): void
}

// The position, background color, and cosutom command controls for the widget
export default class Controls implements ControlInterface {
    // Function to log a message to the client
    private logMessage: (msg: string) => void; 
    // Function to update the widget's settings
    private SetWidgetSetting: UpdateWidgetSettingsFn;
    // Function to execute a play out or custom command
    private ExecutePlayOutCommand: PlayoutCommandFn;
    
    private dragging: boolean = false;
    private mouseDown: boolean = false;
    // The widget's size relative to the current viewport
    private widgetSize: Position = {x: 0, y: 0};
    private backgroundColor: string;
    private customCommand: string;
    private display: string = 'open';
    public elem: HTMLDivElement;
    public position: Position = {x: 0, y: 0};

    constructor(props: ControlProps) {
        this.elem = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-CONTROLS']);
        const displayControlContainer = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-DISPLAY-CONTROLS']);
        const styleControlContainer = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-STYLE-CONTROLS'])

        // Create buttons that control the widget's display
        const hideButton = CreateButton({classes: 'DEV-WIDGET-HIDE'});
        hideButton.addEventListener('click', this.HideWidget);
        const shrinkButton = CreateButton({classes: 'DEV-WIDGET-SHRINK'});
        shrinkButton.addEventListener('click', this.ShrinkWiget);
        const invisButton = CreateButton({classes: 'DEV-WIDGET-INVIS'});
        invisButton.addEventListener('click', this.InvisWidget);

        // Create elements to control the widget's style
        const dragButton = CreateButton({text: 'Drag Me', classes: 'DEV-WIDGET-DRAG-BUTTON'})
        const positionInput = CreateInput({placeholder: 'Position ( y, x )', class: 'DEV-WIDGET-POSITION'});
        const backgroundColorInput = CreateInput({placeholder: 'Bkg Color as Hex / RGB', class: 'DEV-WIDGET-BKG-COLOR'});
        const customCommandInput = CreateInput({placeholder: 'Custom Cmd', class: 'DEV-WIDGET-CUSTOM-COMMAND'});
        const runCustomCommandButton = CreateButton({text: 'Run'});

        // Start dragging event listener
        props.widget.addEventListener('mousedown', () => this.BeginDragginWidget());
        // End dragging event listener
        window.addEventListener('mouseup', () => this.ToggleDraggingWidget(false));
        // Dragging event listener
        window.addEventListener('mousemove', (event: MouseEvent) => this.HandleDragWidget(event));
        // Blur event listener to set the widget's position on screen
        positionInput.addEventListener('blur', 
            (event: MouseEvent) => this.HandleMoveWidget(event.currentTarget));
        // Blur event listener to update the background color
        backgroundColorInput.addEventListener('blur', 
            (event: MouseEvent) => this.HandleBackgroundColor(event.target));
        // Blur event listener to update set and save the custom command
        customCommandInput.addEventListener('blur', 
            event => this.HandleSetCustomCommand(event.target));
        // Click event listener for running the custom command
        runCustomCommandButton.addEventListener('click', 
            event => this.HandleCustomCommand(event.target));

        displayControlContainer.appendChild(hideButton);
        displayControlContainer.appendChild(shrinkButton);
        displayControlContainer.appendChild(invisButton);
        this.elem.appendChild(displayControlContainer);

        // Append componenets
        styleControlContainer.appendChild(dragButton);
        styleControlContainer.appendChild(positionInput);
        styleControlContainer.appendChild(backgroundColorInput);
        styleControlContainer.appendChild(customCommandInput);
        styleControlContainer.appendChild(runCustomCommandButton);
        this.elem.appendChild(styleControlContainer);

        // Save references to required function
        this.logMessage = props.logger;
        this.ExecutePlayOutCommand = props.playOutCommandFn;
        this.SetWidgetSetting = props.setWidgetSetting;
    
        window.addEventListener('resize', () => this.GetWidgetDisplay());
        this.SetWidgetSize();

    }

    // Determines and set's the widget's display mode
    private GetWidgetDisplay() {
        const widget = document.querySelector('.DEV-WIDGET');
        if(widget.classList.contains('DEV-WIDGET-HIDDEN')) {
            this.display = 'hide';
        } else if(widget.classList.contains('DEV-WIDGET-SHRUNKEN')) {
            this.display = 'shrink';
        } else {
            this.display = 'open';
        }
        this.SetWidgetSetting('display', this.display)
        this.SetWidgetSize(this.display);
        this.MoveWidget(this.position);
    }

    // Hides the widget
    private HideWidget = () => {
        const widget = document.querySelector('.DEV-WIDGET');
        if(widget.classList.contains('DEV-WIDGET-SHRUNKEN')) {
            widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
            widget.classList.toggle('DEV-WIDGET-HIDDEN');
        } else {
            widget.classList.toggle('DEV-WIDGET-OPEN');
            widget.classList.toggle( 'DEV-WIDGET-HIDDEN');
        }
        this.GetWidgetDisplay();
    }

    // Shrinks the widget
    private ShrinkWiget = () => {
        const widget = document.querySelector('.DEV-WIDGET');
        if(widget.classList.contains('DEV-WIDGET-HIDDEN')) {
            widget.classList.toggle('DEV-WIDGET-HIDDEN');
            widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
        } else {
            widget.classList.toggle('DEV-WIDGET-OPEN');
            widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
        }
        this.GetWidgetDisplay();
    }

    // Toggle the widget's invisible look
    private InvisWidget = () => {
        const widget = document.querySelector('.DEV-WIDGET');
        widget.classList.toggle('DEV-WIDGET-INVIS');
        if(widget.classList.contains('DEV-WIDGET-INVIS')) {
            this.SetWidgetSetting('invis', true);
            let color = document.querySelector('body').style.backgroundColor;
            const rgb = ClampRGB(InvertColor(CheckRGBValue(color)));
            const invert: string = 'rgb(' + rgb.join(',') + ')';
            this.ChangeWidgetColor(invert);
        } else {
            this.SetWidgetSetting('invis', false);
            this.ChangeWidgetColor('');
        }
    }

    // Sets the widget's size based on the current screen size
    // @param {string} display - What display mode the widget is in
    private SetWidgetSize(display?: string) {
        switch(display) {
            case 'shrink':
                this.widgetSize.x = window.screen.width * .03;
                this.widgetSize.y = window.screen.width * .15;
                break;
            case 'hide':
                this.widgetSize.x = window.screen.width * .03;
                this.widgetSize.y = window.screen.width * .03;
                break;
            default:
                this.widgetSize.x = Math.ceil(window.screen.width * .17);
                this.widgetSize.y = Math.ceil(window.screen.width * .17);
                break;
        }
    }

    // Ensures the widget is on the screen
    // @param {number} pos - The value to be checked
    // @param {number} inner - The screen value being checked
    // @param {number} size - the widget's size to compansate
    // @returns {number} - A validated position
    private ValidatePosition(pos: number, inner: number, size: number): number {
        if(pos <= 0) {
            return 10;
        } else if(pos >= inner - size - (size *.15)) {
            return inner - size - (size *.15);
        } else {
            return pos;
        }
    }

    // Convert's the position from a keyword or string to a number
    // @param {string} pos - The position entered by the user
    private ConvertPosition(pos: string): number {
        if(pos.indexOf('px') > -1) pos = pos.replace(/[px]/g, '');
        if(isNaN(Number(pos))) {
            pos = pos.toLowerCase();
            switch(pos) {
                case 'top':
                case 'left':
                    return 5;
                case 'bottom':
                    return Math.floor(window.innerHeight - this.widgetSize.y - 10);
                case 'right':
                    return Math.floor(window.innerWidth - this.widgetSize.x - 20);
                default:
                    this.logMessage(pos + ' is an invalid position');
                    return 10;
            }
        } else {
            return Number(pos);
        }
    }

    // Sets the required properties to drag the widget around on the screen
    private BeginDragginWidget() {
        // Start dragging logic
        const target = <HTMLElement>event.target;
        const widget =this.elem.parentElement;
        this.mouseDown = true;
        if(target.classList.contains('DEV-WIDGET-DRAG-BUTTON')) {
            this.ToggleDraggingWidget(true);
        } else if(!widget.classList.contains('DEV-WIDGET-OPEN')) {
            setTimeout(() => {
                if(this.mouseDown) this.ToggleDraggingWidget(true);
            }, 100);
        }
    }

    // Begins or stops dragging the widget
    private ToggleDraggingWidget(val: boolean) {
        if(!val) this.mouseDown = false;
        this.dragging = val;
        if(!this.dragging) this.SetWidgetSetting('position', {x: this.position.x, y: this.position.y});
    }

    // Method to apply the new position to the widget
    // @param {MouseEvent} event - The mouses position for dragging the widget
    private HandleDragWidget(event: MouseEvent) {
        if(this.dragging) {
            const input: HTMLInputElement = 
                document.querySelector('.DEV-WIDGET-CONTROLS input:first-of-type');
            const position: Position = {
                x: event.clientX,
                y: event.clientY
            };
            this.MoveWidget(position);
            input.value = this.position.y + ', ' + this.position.x;
        }
    }

    // Method to handle user input and set the widget's position
    // @param {EventTarget} event - The input element containing the user entered position
    private HandleMoveWidget(event: EventTarget): void {
        // Cast the input event target to an HTML Input Type
        const input = (<HTMLInputElement>event);
        const value: string = input.value.replace(/,/g, ' ');
        let values: [number, number];
        const raw: string[] = value.split(' ').map(i => i.trim()).filter(i => i.length);
        if(!raw.length) {
            this.logMessage('Invalid position');
            (<HTMLInputElement>input).value = '';
            return;
        } else if(raw.length === 1) {
            raw[1] = raw[0];
        }
        values = [this.ConvertPosition(raw[0]), this.ConvertPosition(raw[1])];
        this.MoveWidget({y: values[0], x: values[1]});
    }

    // Changes the color of the widget and it's components
    //@param {string} color - The color being set, typically the inverse of the body's color
    private ChangeWidgetColor(color: string) {
        const widget = <HTMLDivElement>this.elem.parentElement;
        const logger = widget.querySelectorAll('.DEV-WIDGET-LOGGER') as NodeListOf<HTMLParagraphElement>;
        const elements = Array.from(widget.querySelectorAll('.DEV-WIDGET-SECTION > button, .DEV-WIDGET-CONTROLS input, .DEV-WIDGET-SETTINGS .DEV-WIDGET-SELECT') as NodeListOf<HTMLElement>);
        elements.forEach(e => {
            // Has an SVG as a child
            if(e.childNodes.length && e.childNodes[0].nodeName === 'svg') {
                let SVGNodes = e.childNodes[0].childNodes as NodeListOf<HTMLElement>;
                SVGNodes.forEach(elem => {
                    if(elem.nodeName !== '#text') {
                        elem.nodeName === 'path' 
                            ? elem.style.fill = color 
                            : elem.style.stroke = color;
                    }
                });
            // Is a normal text button or input
            } else {
                if(e.nodeName === 'INPUT') {
                    e.style.borderColor = color;
                } else if(e.classList.contains('DEV-WIDGET-SELECT')) {
                    const container = e.childNodes[0] as HTMLDivElement;
                    const label = container.childNodes[0] as HTMLLabelElement;
                    const arrow = container.querySelectorAll('path')[1];
                    const arrowBKG = container.querySelectorAll('path')[0];
                    const invert = 'rgb(' + InvertColor(CheckRGBValue(color)).join(',') + ')';
                    container.style.borderColor = color;
                    label.style.color = color;
                    arrow.style.fill = color;
                    arrowBKG.style.fill = invert;
                } else {
                    e.style.color = color;
                }
            }
        });
        widget.style.borderColor = color;
        logger.forEach(l => {l.style.color = color});
    }

    // Handles a user entered background color
    // @param {EventTarget} event - The input containing the background color set by the user
    private HandleBackgroundColor(event: EventTarget) {
        const input = <HTMLInputElement>event;
        let value = input.value.length ? input.value : '255,255,255';
        let raw: number[];
        let final: string;
        if(value.indexOf('http') !== -1) {
            final = value;
        } else {
            if(value.indexOf(' ') !== -1 || value.indexOf(',') !== -1) {
                raw = CheckRGBValue(value);
            } else {
                raw = ConvertHEXtoRGB(value);
            }
            if(!raw.length) {
                this.logMessage('Invalid Background Color');
                input.value = '';
                return;
            }
            final = 'rgba(' + raw.join(',') + ')';
        }
        this.ChangeBackgroundColor(final);
    }
    
    // Attempts to execute a custom command
    // @param {EventTarget} event - The button clicked to run the custom command
    private HandleCustomCommand(event: EventTarget) {
        const button = <HTMLButtonElement>event;
        const input = <HTMLInputElement>button.previousElementSibling;
        if(input.value.length) {
            this.ExecutePlayOutCommand(input.value);
        } else {
            this.logMessage('Invalid Custom Command');
        }
    }

    // Handles the blur event from the custom command input
    // @param {EventTarget} event - The input containing the custom command name
    private HandleSetCustomCommand(event: EventTarget) {
        const input = <HTMLInputElement>event;
        this.SetCustomCommand(input.value);
    }

    // Changes the wigdet's display type
    // @param {string} dsp - The display being applied to the widget
    public ChangeWidgetDisplay(dsp: string) {
        switch(dsp) {
            case 'hide':
                this.HideWidget();
                break;
            case 'shrink':
                this.ShrinkWiget();
                break;
            case 'invis':
                this.InvisWidget();
                break;
        }
    }

    // Moves the widget somewhere on screen
    // @param {object} position - The x and y coordinates for where the widget will move to
    public MoveWidget(position: Position) {
        const widget = document.querySelector('.DEV-WIDGET') as HTMLDivElement;
        const positionInput = this.elem.querySelector('.DEV-WIDGET-POSITION') as HTMLInputElement;
        
        this.position.x = this.ValidatePosition(position.x, window.innerWidth, this.widgetSize.x);
        this.position.y = this.ValidatePosition(position.y, window.innerHeight, this.widgetSize.y);
        
        widget.style.left = this.position.x + 'px';
        widget.style.top = this.position.y + 'px';
        positionInput.value = this.position.y + ', ' + this.position.x;
        
        if(!this.dragging) this.SetWidgetSetting('position', {x: this.position.x, y: this.position.y});
    }

    // Changes the background color and adjust the widget's color
    // @param {string} color - The color to set the body to
    public ChangeBackgroundColor(color: string) {
        const body = document.querySelector('body');
        const widget = <HTMLDivElement>document.querySelector('.DEV-WIDGET');
        const bkgInput = <HTMLInputElement>this.elem.querySelector('.DEV-WIDGET-BKG-COLOR');
        this.backgroundColor = color;
        if(color.indexOf('http') !== -1) {
            body.style.backgroundImage = 'url(' + this.backgroundColor + ')';
            body.style.backgroundSize = 'cover';
        } else {
            const invert = 'rgb(' + ClampRGB(InvertColor(CheckRGBValue(color))).join(',') + ')';
            const titleSafe = document.querySelector('.DEV-WIDGET-TITLE-SAFE') as HTMLElement;
            titleSafe.style.borderColor = invert;
            body.style.backgroundImage = ''
            body.style.backgroundColor = this.backgroundColor;
            if(widget.classList.contains('DEV-WIDGET-INVIS')) this.ChangeWidgetColor(invert);
        }
        bkgInput.value = color;
        this.SetWidgetSetting('backgroundColor', this.backgroundColor);
    }

    // Set's the custom command current being used
    // @param {string} cmd - The name of the custom command that will be ran
    public SetCustomCommand(cmd: string) {
        const cc = <HTMLInputElement>this.elem.querySelector('.DEV-WIDGET-CUSTOM-COMMAND');
        this.customCommand = cmd;
        cc.value = this.customCommand;
        this.SetWidgetSetting('customCommand', this.customCommand);
    }
}