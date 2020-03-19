// Component Imports
import Storage from './Storage';

interface WidgetStorageInterface {
    SetWidgetSetting: UpdateWidgetSettingsFn;
    ResetWidgetData: () => void;
}

// The required data for the widget
export interface WidgetSettingsInterface {
    display: string;
    invis: boolean;
    position: {x: number, y: number};
    backgroundColor: string;
    customCommand: string;
    user: {
        runUpdate: boolean;
        titleSafe: number;
    }
    associations: string[];
    [index: string]: any;
}

// Funtion for setting the widget settings
export interface UpdateWidgetSettingsFn {
    (key: string, 
    value: string
        | string[]
        | boolean 
        | {x: number, y: number} 
        | {runUpdate: boolean, titleSafe: number}
    ): void;
}

export class WidgetStorage extends Storage implements WidgetStorageInterface {
    private readonly defaultData: WidgetSettingsInterface = {
        display: 'open',
        invis: false,
        position: {x: 10, y: 10},
        backgroundColor: 'rgba(255,255,255,1)',
        customCommand: '',
        user: {runUpdate: false, titleSafe: 0},
        associations: []
    }
    public widgetSettings: WidgetSettingsInterface;

    constructor() {
        super();
        // Attempt to load the settings from the browsers local storage
        try {
            this.widgetSettings = JSON.parse(this.GetData('DEV-WIDGET-SETTINGS'));
            if(!this.widgetSettings) throw new Error();
        } catch (error) {
            this.widgetSettings = JSON.parse(JSON.stringify(this.defaultData));
            // @todo Finish saving data for Caspar
            if(!window.caspar) {
                this.SaveWidgetData();
            }
        }
    }

    // Saves data to localstorage
    private SaveWidgetData() {
        this.SaveData('DEV-WIDGET-SETTINGS', this.widgetSettings);
    }

    // Saves a change to the widget's settings
    public SetWidgetSetting: UpdateWidgetSettingsFn = (key, value) => {
        if(this.widgetSettings[key] === undefined) {
            return;
        }
        this.widgetSettings[key] = value;
        this.SaveWidgetData();
    }
    // Resets all widget data except for template data
    public ResetWidgetData = () => {
        this.widgetSettings = {...JSON.parse(JSON.stringify(this.defaultData)), associations: this.widgetSettings.associations};
        this.SaveWidgetData();
    }
}