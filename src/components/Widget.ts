/*  Main widget component */
// Component Imports
import { WidgetStorage, WidgetSettingsInterface } from './storage/WidgetStorage';
import { TemplateDataInterface } from './storage/TemplateStorage';
import Controls from './Controls';
import PlayoutControls from './PlayOutControls';
import Settings from './Settings';
import Logger from './Logger';

// Factory Imports
import CreateElement from './ui/ElementFactory';

// SCSS Improts
import '../scss/widget.scss';

interface WidgetInterface {
    ChangeBackgroundColor: (color: string) => void;
    GetTemplateData: () => TemplateDataInterface;
    GetDataOptions: () => [string, string][];
    SelectTemplateData: (name: string) => void;
    SetTemplateData: (data: string, name?: string) => void;
    AssociateData: (association: string) => void;
    SetWidgetEnv: (state: boolean) => void;
}

// Widget class that controls most action of the widget
export default class Widget implements WidgetInterface {
    // If the widget should effect the html page
    private env: boolean = false;
    public elem: HTMLDivElement;
    // Widget's log class to log message to the user
    private Logger = new Logger();
    // Widget's Storage
    private Storage = new WidgetStorage();
    // Widget's primary controls
    private Controls: Controls;
    // Widget's CasparCG play out commands
    private PlayoutControls: PlayoutControls;
    // Widget's settings
    private Settings: Settings;
    public ChangeBackgroundColor: (color: string) => void;
    public GetTemplateData: () => TemplateDataInterface;
    public GetDataOptions: () => [string, string][];
    public SelectTemplateData: (name: string) => void;
    public SetTemplateData: (data: string, name?: string) => void;
    public AssociateData: (association?: string) => void;
    public ExecutePlayOutCommand: (cmd: string) => void;

    constructor() {
        // Create the main widget container
        this.elem = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET', 'DEV-WIDGET-OPEN']);
        this.SetWidgetEnv = this.SetWidgetEnv.bind(this);
        // Check we are in debug mode
        if(window.location.search.indexOf('debug=true') !== -1) this.env = true;

        // Create the settings for the widget
        this.Settings = new Settings({
            logger: this.Logger.displayMessage,
            widgetSettings: this.Storage.widgetSettings,
            setWidgetSetting: this.Storage.SetWidgetSetting,
            resetAllWidgetData: () => {
                this.Storage.ResetWidgetData();
                this.AssociateData();
                this.ApplyWidgetSettings(this.Storage.widgetSettings);
            }
        });
        // Create the play out controls ( AMCP Comamnds ) for the widget
        this.PlayoutControls = new PlayoutControls({
            logger: this.Logger.displayMessage,
            getSelectedTemplateData: this.Settings.GetTemplateData
        });
        // Create the controls for the widget itself. Dispaly, position, and custom commands
        this.Controls = new Controls({
            logger: this.Logger.displayMessage,
            playOutCommandFn: this.PlayoutControls.ExecutePlayOutCommand,
            setWidgetSetting: this.Storage.SetWidgetSetting,
            widget: this.elem
        });

        // Append Widget Components to this Widget div element
        this.elem.appendChild(this.Controls.elem);
        this.elem.appendChild(this.PlayoutControls.elem);
        this.elem.appendChild(this.Settings.elem);
        this.elem.appendChild(this.Logger.elem);

        this.GetTemplateData = this.Settings.GetTemplateData;
        this.GetDataOptions= this.Settings.GetDataOptions;
        this.SelectTemplateData = this.Settings.SelectTemplateData;
        this.SetTemplateData = this.Settings.SetTemplateData;
        this.AssociateData = this.Settings.AssociateData;
        this.ExecutePlayOutCommand = this.PlayoutControls.ExecutePlayOutCommand;
        
        // Append the widget to the DOM
        document.querySelector('body').appendChild(this.elem);

        // Apply the widget's setting if the env is development
        if(this.env) {
            this.ApplyWidgetSettings(this.Storage.widgetSettings);
        // Else hide the widget
        } else {
            this.elem.style.display = 'none';
        }
    }
    // Sets the standard settings for the widget
    // @param {object} - A deconstructed object with the minumum requrired properties to set the widget
    private ApplyWidgetSettings = ({
        display, 
        invis, 
        position, 
        backgroundColor,
        customCommand
    }: WidgetSettingsInterface): void => {
        this.Controls.ChangeBackgroundColor(backgroundColor);
        this.Controls.SetCustomCommand(customCommand);
        this.Controls.ChangeWidgetDisplay(display);
        this.Controls.MoveWidget(position);
        if(invis) this.Controls.ChangeWidgetDisplay('invis');
        if(this.Storage.widgetSettings.user.runUpdate) this.PlayoutControls.ExecutePlayOutCommand('update');
    }

    // Toggles the widgets ability to effect the HTML page
    public SetWidgetEnv(state: boolean) {
        this.env = state;
        if(this.env) {
            this.elem.style.display = 'flex';
            this.ApplyWidgetSettings(this.Storage.widgetSettings);
        } else {
            const body = document.querySelector('body');
            body.style.backgroundColor = '';
            this.elem.style.display = 'none';
        }
    }
}