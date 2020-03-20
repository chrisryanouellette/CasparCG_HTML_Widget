// Factory Imports
import CreateElement from './ElementFactory';
import CreateButton from './form/Button';
import CreateMinusIcon from '../icons/PlusIcon';

// Color functions
import {CheckRGBValue, ClampRGB, InvertColor} from '../helpers/ColorFunctions';

interface PopupInterface {
    Open: () => void;
    Close: (resetWidget?: boolean) => void;
}

// Base popp class
export default class Popup implements PopupInterface {
    // Where the widget was before the popup opened
    private oldPosition: {x: string, y: string};
    // The area of the popup where the main content goes
    protected body: HTMLElement;
    // The full popup window
    public elem: HTMLDivElement;

    constructor() {
        this.elem = <HTMLDivElement>CreateElement('div', 'DEV-WIDGET-POPUP')

        // Elements to handle closing the popup
        const minusIcon = CreateMinusIcon();
        const closeButton = CreateButton({classes: 'DEV-WIDGET-CLOSE-BUTTON'});

        minusIcon.classList.remove('DEV-WIDGET-PLUS-ICON');
        minusIcon.classList.add('DEV-WIDGET-CLOSE-ICON');
        closeButton.appendChild(minusIcon);
        closeButton.addEventListener('click', () => this.Close());

        this.body = CreateElement('div', 'DEV-WIDGET-POPUP-BACKGROUND');
        const wrapper = CreateElement('div');

        this.elem.appendChild(wrapper);
        wrapper.appendChild(closeButton);
        wrapper.appendChild(this.body);

        this.Open = this.Open.bind(this);
        this.Close = this.Close.bind(this);
    }

    // Opens the popup
    public Open() {
        this.elem.classList.add('DEV-WIDGET-POPUP-OPEN');
        const widget = <HTMLDivElement>document.querySelector('.DEV-WIDGET');
        // Bodies background color
        const color = document.querySelector('body').style.backgroundColor;
        // Inverted background color
        const bkgColor = 'rgb(' + ClampRGB(InvertColor(CheckRGBValue(color))).join(',') + ')';
        // Main logger
        const logger = <HTMLParagraphElement>document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
        // Elements to adjust the color of
        const elems = this.elem.querySelectorAll('.DEV-WIDGET-CLOSE-ICON circle, .DEV-WIDGET-CLOSE-ICON line') as NodeListOf<HTMLElement>;
        const popUplogger = <HTMLDivElement>this.elem.querySelector('.DEV-WIDGET-LOGGER p');
        this.oldPosition = {x: widget.style.left, y: widget.style.top};

        widget.style.top = '0';
        widget.style.left = '0';
        logger.style.display = 'none';
        if(popUplogger) popUplogger.style.color = bkgColor;
        elems.forEach(e => e.style.stroke = bkgColor);
    }

    // Closes the popup
    public Close(resetWidget?: boolean) {
        this.elem.classList.remove('DEV-WIDGET-POPUP-OPEN');
        const widget = <HTMLDivElement>document.querySelector('.DEV-WIDGET');
        const logger = <HTMLParagraphElement>document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
        // Reset widget position
        if(resetWidget !== false) {
            widget.style.top = this.oldPosition.y;
            widget.style.left = this.oldPosition.x;
        }
        
        logger.style.display = '';
    }
}