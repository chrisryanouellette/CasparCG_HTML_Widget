/* The Widget's settings and Template Data */
// Factory Imports
import CreateSelect from './ui/form/Select';
import CreateElement from './ui/ElementFactory';
import CreateButton from './ui/form/Button';
import CreateGitHubIcon from './icons/GitHubIcon';
import CreateSettingsIcon from './icons/SettingsIcon';
import CreateHelpIcon from './icons/HelpIcon';

// Component Imports
import TemplateData from './popups/TemplateData';
import UserSettings from './popups/UserSettings';
import Help from './popups/HelpWindow';

import {WidgetSettingsInterface, UpdateWidgetSettingsFn} from './storage/WidgetStorage';
import { TemplateDataInterface } from './storage/TemplateStorage';

interface SettingsProps {
    logger: (msg: string) => void;
    widgetSettings: WidgetSettingsInterface;
    setWidgetSetting: UpdateWidgetSettingsFn;
    resetAllWidgetData: () => void;
}

interface SettingsInterface {
    UpdateDataOptions: (options: [string, string][]) => void;
    GetTemplateData: () => TemplateDataInterface;
    GetDataOptions: () => [string, string][];
    SelectTemplateData: (name: string) => void;
    SetTemplateData: (data: string, name?: string) => void;
    AssociateData: (association: string) => void;
}

// On screen settings and template data for widget
export default class Settings implements SettingsInterface {
    private logMessage: (msg: string) => void;
    public elem: HTMLDivElement;
    public GetTemplateData: () => TemplateDataInterface;
    public GetDataOptions: () => [string, string][];
    public SelectTemplateData: (name: string) => void;
    public SetTemplateData: (data: string) => void;
    public AssociateData: (association?: string) => void;

    constructor(props: SettingsProps) {
        this.SelectWidgetDataSet = this.SelectWidgetDataSet.bind(this);
        this.UpdateDataOptions = this.UpdateDataOptions.bind(this);

        this.elem = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-SETTINGS']);
        // Set the logger function
        this.logMessage = props.logger;

        const templateData = new TemplateData({
            selected: props.widgetSettings.selectedData,
            associations: props.widgetSettings.associations,
            selectWidgetDataSet: this.SelectWidgetDataSet,
            updateWidgetDataOptions: this.UpdateDataOptions,
            setWidgetSetting: props.setWidgetSetting
        });
        this.GetTemplateData = templateData.GetTemplateData;
        this.GetDataOptions = templateData.GetDataOptions;
        this.SelectTemplateData = templateData.SelectTemplateData;
        this.SetTemplateData = templateData.SetSelectedTemplateData;
        this.AssociateData = templateData.AssociateTemplateData;
        const help = new Help();
        const userSettings = new UserSettings({
            userSettings: props.widgetSettings.user,
            setWidgetSetting: props.setWidgetSetting,
            resetWidgetSetting: props.resetAllWidgetData
        });

        const options = templateData.GetDataOptions();
        if(!options.length) options.push(['no-data', 'No Data']);

        // Create data selection an edit button
        const select = CreateSelect({options, offsetOnly: true});
        select.style.position = 'relative';
        select.addEventListener('change', () => 
            templateData.ChangeDataSet(select.getAttribute('value')));
        const dataButton = CreateButton({text: 'Data', classes: 'DEV-WIDGET-DATA'});
        dataButton.addEventListener('click', templateData.Open);
        
        // Create setting buttons
        const githubButton = CreateButton();
        const settingsButton = CreateButton();
        const helpButton = CreateButton();
        // Append the icons
        githubButton.appendChild(CreateGitHubIcon());
        settingsButton.appendChild(CreateSettingsIcon());
        helpButton.appendChild(CreateHelpIcon());

        githubButton.addEventListener('click', () => 
            this.logMessage('github.com/chrisryanouellette/CasparCG_HTML_Widget'));
        settingsButton.addEventListener('click', userSettings.Open);
        helpButton.addEventListener('click', help.Open);

        this.elem.appendChild(select);
        this.elem.appendChild(dataButton);
        this.elem.appendChild(githubButton);
        this.elem.appendChild(settingsButton);
        this.elem.appendChild(helpButton);

        this.elem.appendChild(templateData.elem);
        this.elem.appendChild(userSettings.elem);
        this.elem.appendChild(help.elem);
    }

    // Selects the template data option in the settings select element
    // @param {string} name - The data set's name
    public SelectWidgetDataSet(name: string) {
        const select = this.elem.querySelector('.DEV-WIDGET-SELECT');
        const label = select.childNodes[0].childNodes[0] as HTMLLabelElement;
        label.setAttribute('value', name);
        label.textContent = name.replace(/-/g, ' ');
    }

    // Creates a new list of data sets when a data set is added or removed
    // @param {array} options - An array of strings that will be the selectable options
    public UpdateDataOptions = (options: [string, string][]) => {
        if(!options.length) options.push(['no-data', 'No Data']);
        const optionsList = CreateSelect({options, offsetOnly: true}).childNodes[1];
        const current = this.elem.querySelector('.DEV-WIDGET-SELECT');
        const label = <HTMLLabelElement>current.childNodes[0].childNodes[0];
        [...current.childNodes[1].childNodes].forEach(c => current.childNodes[1].removeChild(c));
        [...optionsList.childNodes].forEach(c => current.childNodes[1].appendChild(c));
        label.textContent = options[0][1];
    }
}