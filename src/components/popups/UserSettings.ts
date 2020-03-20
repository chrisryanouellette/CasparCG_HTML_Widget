import Popup from '../ui/Popup';

// Factory Functions
import CreateElement from '../ui/ElementFactory';
import CreateLabel from '../ui/form/Label';
import CreateInput from '../ui/form/Input';
import CreateCheckbox from '../ui/form/Checkbox';
import CreateButton from '../ui/form/Button';

import { UpdateWidgetSettingsFn } from '../storage/WidgetStorage';

interface UserSettingsProps {
    userSettings: {
        runUpdate: boolean;
        titleSafe: number;
    }
    setWidgetSetting: UpdateWidgetSettingsFn;
    resetWidgetSetting: () => void;
}

// Popup to edit the user settings
export default class UserSettings extends Popup {
    private SetWidgetSetting: UpdateWidgetSettingsFn;
    private ResetWidgetSetting: () => void;
    // If the widget should run the AMCP update command on page load
    private runUpdate: boolean;
    // Title safe percentage
    private titleSafe: number;

    // Title Safe Area
    private TitleSafe: HTMLElement;

    constructor(props: UserSettingsProps) {
        super();
        this.runUpdate = props.userSettings.runUpdate;
        this.titleSafe = props.userSettings.titleSafe;
        this.SetWidgetSetting = props.setWidgetSetting;
        this.ResetWidgetSetting = props.resetWidgetSetting;
        this.elem.classList.add('DEV-WIDGET-USER-SETTINGS');

        // Create elements
        const header = CreateElement('h2');
        const form = CreateElement('form', 'DEV-WIDGET-POPUP-FORM');
        const runUpdateButton = CreateCheckbox();
        const runUpdateLabel = CreateLabel({
            text: 'Run Update Command on Page Load',
            //customElement: runUpdateButton
        });
        const titleSafeInput = CreateInput({defaultValue: this.titleSafe * 100 + '%'});
        const titleSafeLabel = CreateLabel({
            text: 'Title Safe Area',
            customElement: titleSafeInput
        });

        const optionsContainer = CreateElement('div');
        const saveButton = CreateButton({text: 'Save'});
        const doNotSaveButton = CreateButton({text: 'Do Not Save'});
        const clearDataButton = CreateButton({text: 'Reset Widget Settings', classes: 'DEV-WIDGET-DANGER-BUTTON'});

        // Modify elements
        header.textContent = 'Widget Settings';
        runUpdateButton.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLButtonElement;
            target.classList.contains('DEV-WIDGET-CHECKED')
                ? this.runUpdate = true
                : this.runUpdate = false;
        });
        if(this.runUpdate) runUpdateButton.classList.add('DEV-WIDGET-CHECKED');
        
        titleSafeInput.addEventListener('input', (e: Event) => this.CheckTitleSafe(e.target));
        titleSafeInput.addEventListener('blur', (e: Event) => this.CheckTitleSafe(e.target));

        this.TitleSafe = CreateElement('div');
        this.TitleSafe.classList.add('DEV-WIDGET-TITLE-SAFE');
        if(this.titleSafe === 0 || !window.location.search.includes('debug=true')) {
            this.TitleSafe.style.display = 'none';
        } else {
            this.AdjustTitleSafe(this.titleSafe);
        }
        
        optionsContainer.classList.add('DEV-WIDGET-TEMPLATE-DATA-CONTROLLER');
        saveButton.addEventListener('click', () => this.HandleSaveData());
        doNotSaveButton.addEventListener('click', () => this.Close());
        clearDataButton.addEventListener('click', () => this.ResetWidgetData());
        
        // Append elements
        this.body.appendChild(header);
        this.body.appendChild(form);
        form.append(runUpdateLabel);
        form.append(runUpdateButton);
        form.append(titleSafeLabel);
        form.append(titleSafeInput);
        this.body.appendChild(optionsContainer);
        optionsContainer.append(saveButton);
        optionsContainer.append(doNotSaveButton);

        this.elem.firstElementChild.appendChild(clearDataButton);
        document.querySelector('body').appendChild(this.TitleSafe);
        window.addEventListener('resize', () => this.AdjustTitleSafe(this.titleSafe));
    }

    // Checks the value for the title safe element
    // @param {DOM Node} e - The input used to set the title safe percentage
    private CheckTitleSafe(e: EventTarget) {
        const target = <HTMLInputElement>e;
        let val: string = target.value;
        if(val.indexOf('%') !== 1) val = val.split('').filter(v => v !== "%").join('');
        if(isNaN(Number(val))) target.value = '';
        let percentage = Number(val) / 100;
        if(percentage >= 1) {
            target.value = '100%';
            percentage = .99;
        }
        this.AdjustTitleSafe(percentage);
    }

    // Applies a valid title safe percentage to the title safe element
    // @param {number} percentage - Percentage to consider "safe" on the screen
    private AdjustTitleSafe = (percentage: number) => {
        const border = window.innerWidth * .002; 
        const height = window.innerHeight - (window.innerHeight * percentage) - (border / 2);
        const topPadding = (window.innerHeight - height) / 2 - (border / 2);
        const width = window.innerWidth - (window.innerWidth * percentage) - (border / 2);
        const rightPadding = (window.innerWidth - width) / 2 - (border / 2);
        const style = this.TitleSafe.style;

        if(percentage <= 0) {
            style.display = 'none';
        } else {
            style.display = 'block';
            style.height = height + 'px';
            style.width = width + 'px';
            style.top = topPadding + 'px';
            style.right = rightPadding + 'px';
        }
        style.borderWidth = border  + 'px';
        this.titleSafe = percentage;
    }

    // Saves the user's current data
    private HandleSaveData() {
        this.SetWidgetSetting('user', {
            runUpdate: this.runUpdate,
            titleSafe: this.titleSafe
        });
        this.Close();
    }

    // Resets the widget's user data
    private ResetWidgetData = () => {
        const checkboxes = this.elem.querySelectorAll('.DEV-WIDGET-CHECKBOX') as NodeListOf<HTMLElement>;
        const input = this.body.querySelector('input') as HTMLInputElement;
        const logger = <HTMLParagraphElement>document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
        checkboxes.forEach(e => e.classList.remove('DEV-WIDGET-CHECKED'));
        input.value = '0%';
        logger.style.display = '';
        this.runUpdate = false;
        this.AdjustTitleSafe(0);
        this.ResetWidgetSetting();
        this.Close(false);
    }
}