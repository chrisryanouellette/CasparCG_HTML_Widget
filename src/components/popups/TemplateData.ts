import Popup from '../ui/Popup';
import Logger from '../Logger';
import { CreateDraggable, CreateDropable } from '../ui/Dragable';

// Import Factory Function
import CreateElement from '../ui/ElementFactory';
import CreateLabel from '../ui/form/Label';
import CreateButton from '../ui/form/Button';
import CreateInput from '../ui/form/Input';
import CreatePlusIcon from '../icons/PlusIcon';
import CreateMinusIcon from '../icons/MinusIcon';
import CreateTrashIcon from '../icons/TrashIcon';
import CreateSaveIcon from '../icons/SaveIcon';
import CreateDraggableIcon from '../icons/DraggableIcon';
import CreateConvertToJSONIcon from '../icons/ConvertToJSON';

// Storage Functons / Components
import {
    TemplateStorage, 
    TemplateDataInterface
} from '../storage/TemplateStorage';
import { UpdateWidgetSettingsFn } from '../storage/WidgetStorage';

// Helper Functions
import CreateDataRow from '../helpers/CreateDataRow';
import EncodeData from '../helpers/EncodeDataToDom';
import DecodeData from '../helpers/DecodeDataFromDom';

interface TemplateDataProps {
    selected: string;
    associations: string[];
    selectWidgetDataSet: (name: string) => void;
    updateWidgetDataOptions: (options: [string, string][]) => void;
    setWidgetSetting: UpdateWidgetSettingsFn;
}

interface TemplateDataComponentInterface {
    GetDataOptions: () => [string,string][];
    GetTemplateData: () => TemplateDataInterface;
    SetSelectedTemplateData: (data: string) => void;
    AssociateTemplateData: (association?: string) => void;
}

// A popup that controls the creation, deletion, and updating template data
export default class TemplateData extends Popup implements TemplateDataComponentInterface {
    private TemplateStorage: TemplateStorage; // The template sotrage class
    private templateData: TemplateDataInterface[]; // All usable template date
    private selected: string; // The name of the selected data
    private associated: boolean; // If we are using data from another template
    private associations: string[]; // A list of all other templates with data
    // Selects the correct template data on the widget's select
    private SelectWidgetDataSet: (name: string) => void; 
    // Updates the select element on the widget displaying all the avaible data
    private UpdateWidgetOptions: (options: [string, string][]) => void;
    private SetWidgetSetting: UpdateWidgetSettingsFn; // Sets a property on the widget's settings
    private LogMessage: (msg: string) => void;

    constructor(props: TemplateDataProps) {
        super();
        this.elem.classList.add('DEV-WIDGET-TEMPLATE-DATA');
        this.TemplateStorage = new TemplateStorage();
        this.associations = props.associations;
        this.GetDataOptions = this.GetDataOptions.bind(this);
        this.SetWidgetSetting = props.setWidgetSetting;
        this.SelectWidgetDataSet = props.selectWidgetDataSet;
        this.UpdateWidgetOptions = props.updateWidgetDataOptions;
        this.GetTemplateData = this.GetTemplateData.bind(this);
        this.SelectTemplateData = this.SelectTemplateData.bind(this);
        this.ChangeDataSet = this.ChangeDataSet.bind(this);
        this.SetSelectedTemplateData = this.SetSelectedTemplateData.bind(this);
        this.HandleDrop = this.HandleDrop.bind(this);
        this.HandleDragEnd = this.HandleDragEnd.bind(this);
        this.AssociateTemplateData = this.AssociateTemplateData.bind(this);

        // Template data assocation and validattion
        const associated = this.TemplateStorage.ModifyAssociation();
        const validAssociation = this.associations.findIndex(a => a === associated) > -1 ? true : false;
        const logger = new Logger(); // Logger

        // Check data still excists and if so, use it
        if(validAssociation) {
            this.associated = true;
            this.templateData = typeof associated === 'string'
                ? this.TemplateStorage.GetTemplateData(associated)
                : this.TemplateStorage.GetTemplateData();
        } else {
            this.associated = false;
            this.TemplateStorage.ModifyAssociation(null);
            this.templateData = this.TemplateStorage.GetTemplateData();
        }

        this.LogMessage = logger.displayMessage;
        logger.elem.style.position = 'relative';

        // Create Main Containers
        const leftCon = CreateElement('div');
        const rightCon = CreateElement('div');
        
        // Create Template Data Sets & Associations
        const dataSetsTitle = CreateElement('h2');
        const associationsTitle = CreateElement('h2');
        const setsCon = CreateElement('div', 'DEV-WIDGET-DATA-SETS');
        const associationsCon = CreateElement('div', 'DEV-WIDGET-ASSOCIATIONS');
        const options = this.GetDataOptions();
        const labelOptions = options
            .filter(data => data[1] !== 'No Data')
            .map(data => this.CreateDataLabel(data, !this.associated));
        const labelAssociations = this.CreateAssociationLabels(this.associations);
        const convertToJSON = CreateConvertToJSONIcon();
        const plusIcon = CreatePlusIcon();
        const minusIcon = CreateMinusIcon();
        const trashIcon = CreateTrashIcon();

        // Create Template Data Componenets
        const dataTitle = CreateElement('h2');
        const dataCon = CreateElement('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        const textArea =  <HTMLTextAreaElement>CreateElement('textarea');

        // Create Template Data Controls
        const nameContainer = CreateElement('div', 'DEV-WIDGET-TEMPLATE-NAME');
        const dataNameInput = CreateInput({placeholder: 'Name for Data Set'});
        const saveButton = CreateButton();
        saveButton.appendChild(CreateSaveIcon());
        saveButton.addEventListener('click', () => this.HandleSaveDataSet());

        // Modify Data Set Elements
        dataSetsTitle.textContent = 'Data Sets';
        if(labelOptions.length) labelOptions[0].classList.add('DEV-WIDGET-SELECTED');
        CreateDropable(setsCon, {
            drop: this.HandleDrop, 
            dragOver: (e: DragEvent) => e.preventDefault()
        });
        // Modify Assocaition Elements
        associationsTitle.textContent = 'Associations';
        associationsTitle.setAttribute('value', this.TemplateStorage.templateName[0]);
        associationsTitle.addEventListener('click', 
            (e: MouseEvent) => {
                const target = <HTMLLabelElement>e.target;
                this.HandleSelectAssocation(target.getAttribute('value'));
            });
        labelAssociations.forEach((l, i) => {
            if(this.associated) {
                if(this.associations[i] === associated) 
                    l.classList.add('DEV-WIDGET-SELECTED')
            } else if(this.associations[i] === this.TemplateStorage.templateName[0]) {
                l.classList.add('DEV-WIDGET-SELECTED')
            }
            associationsCon.appendChild(l);
        });
        // Modify Template Data Elements
        dataTitle.innerHTML = 'Template Data';
        textArea.style.display = 'none';
        convertToJSON.addEventListener('click', () => this.HandleDisplayJSON(textArea));
        plusIcon.addEventListener('click', () => {
            if(this.associated) {
                this.LogMessage('Associated data can not be added to');
                return;
            }
            dataCon.appendChild(CreateDataRow('text'));
        });
        minusIcon.addEventListener('click', () => {
            if(this.associated) {
                this.LogMessage('Associated data can not be removed');
                return;
            }
            const container = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
            [...container.childNodes].forEach(c => container.removeChild(c));
        });
        trashIcon.addEventListener('click', () => {
            if(this.selected === null) return;
            if(this.associated) {
                this.LogMessage('Associated data can not be deleted');
                return;
            }
            const container = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
            [...container.childNodes].forEach(c => container.removeChild(c));
            this.HandleSaveDataSet(); 
        });

        // Append Data Set Elements
        leftCon.appendChild(dataSetsTitle);
        labelOptions.forEach(o => setsCon.appendChild(o));
        leftCon.appendChild(setsCon);
        leftCon.appendChild(associationsTitle);
        leftCon.appendChild(associationsCon);
        this.body.appendChild(leftCon);
        // Append Template Data Elements
        dataTitle.append(convertToJSON);
        dataTitle.appendChild(plusIcon);
        dataTitle.appendChild(minusIcon);
        dataTitle.appendChild(trashIcon);
        // Append Template Data Elements
        rightCon.appendChild(dataTitle);
        rightCon.appendChild(dataCon);
        rightCon.appendChild(textArea);
        nameContainer.appendChild(dataNameInput);
        nameContainer.appendChild(saveButton);
        rightCon.appendChild(nameContainer);
        this.body.appendChild(rightCon);
        this.elem.firstElementChild.appendChild(logger.elem);

        if(this.templateData.length) {
            this.selected = props.selected 
                ?  props.selected 
                : this.templateData[0].name;
            this.ChangeDataSet(this.selected);
        } else {
            this.selected = null;
        }
    }
    
    // Creates a label representing a data set
    // @param {[string, string]} data - The raw and parsed name for the data
    // @param {boolean} draggable - If the data can be re-ordered in the parent container
    // @returns {DOM Node} - The Label Element
    private CreateDataLabel(data: [string, string], draggable?: boolean): HTMLLabelElement {
        const label = CreateLabel({text: data[1]});
        label.setAttribute('value', data[0]);
        label.prepend(CreateDraggableIcon());
        label.addEventListener('click', () => {
            this.ChangeDataSet(data[0]);
            this.SelectWidgetDataSet(this.selected);
            this.HandleLoadDataSet();
        });
        if(draggable !== false) CreateDraggable(label, {
            dragStart: this.HandleDragStart, 
            dragEnter: this.HandleDragEnter,
            dragLeave: this.HandleDragLeave,
            dragEnd: this.HandleDragEnd
        })
        return label;
    }

    // Stores the data related to the draggable data set
    // @param {DragEvent} e - The event tied to the start of the drag
    private HandleDragStart(e: DragEvent) {
        const target = <HTMLLabelElement>e.target;
        // Find the selected data set's index within the parent
        const i = Array.prototype.indexOf.call(target.parentElement.children, target);

        e.dataTransfer.setData('text/plain', i); // Set which data set we are working with
        e.dataTransfer.dropEffect = 'move';

        target.style.opacity = '.5';
        target.style.borderBottom = '.15vw solid transparent';
    }

    // Handle a drag object entering a valid drop zone
    // @param {Drag Event} e -  The event attached to the drop zone that 
    //                          has had the element dragged into it
    private HandleDragEnter(e: DragEvent) {
        e.preventDefault();
        const target = <HTMLLabelElement>e.target;
        if(target.nodeName === 'LABEL') 
            target.style.borderTop = '0.15vw solid #1177B7';
    }
    
    // Handles a drag element leaving a valid drop zone
    // @param {Drag Event} e - The event attached to the drag zone
    private HandleDragLeave(e: DragEvent) {
        e.preventDefault();
        const target = <HTMLLabelElement>e.target;
        if(target.nodeName === 'LABEL') 
            target.style.borderTop = '';
    }

    // Handles dropping the element into a valid drag zone
    // @param {Drag Event} e - The event attached to the drop zone being dropped into.
    private HandleDrop(e: DragEvent) {
        e.preventDefault();
        const dropZone = <HTMLDivElement>e.currentTarget;
        const target = <HTMLLabelElement>e.target;
        const index = Number(e.dataTransfer.getData('text/plain'));
        const child = <HTMLLabelElement>dropZone.childNodes[index];
        const label = this.CreateDataLabel([child.getAttribute('value'), child.textContent]);
        if(target !== child) { // We are not dropping the item on itself
            const data = this.templateData.splice(index, 1)[0];
            if(target.nodeName === 'LABEL') {
                // Find the target's index in the drop zone's children
                const i = Array.prototype.indexOf.call(dropZone.children, target);
                dropZone.removeChild(child);
                // Insert the new label before the target label
                target.insertAdjacentElement('beforebegin', label); 
                this.templateData.splice(i, 0, data);
            } else {
                dropZone.removeChild(child);
                dropZone.appendChild(label);
                this.templateData.push(data);
            }
        }
        if(child.getAttribute('value') === this.selected) // Select the dropped value
            label.classList.add('DEV-WIDGET-SELECTED');
        target.style.borderTop = '';
        this.TemplateStorage.SaveTemplateData(this.templateData); // Store the new order
    }

    // Handles a canceled / invalid drag 
    // @param {Drag Event} e - The event attached to the element who's drag was canceled
    private HandleDragEnd(e: DragEvent) {
        e.preventDefault();
        const target = <HTMLLabelElement>e.target;
        target.style.borderBottom = '';
        if(Number(target.style.opacity) < 1) {
            target.style.opacity = '1';
        }
        if(target.getAttribute('value') === this.selected) 
            target.classList.add('DEV-WIDGET-SELECTED');
    }

    // Creates all the association labels for some template data
    // @param {string[]} associations - A list of templates that have data that can be assocaited to
    // @returns {DOM Node} - The label element
    private CreateAssociationLabels(associations: string[]): HTMLLabelElement[] {
        return associations.map(a => [a, a.substring(17).replace(/(.html)|-|\./g, ' ').trim()])
            .map(a => {
                a[1] = !a[1].length ? 'Index' : a[1];
                return a;
            }).map(a => {
                const label = CreateElement('label') as HTMLLabelElement;
                label.textContent = a[1];
                label.setAttribute('value', a[0]);
                label.addEventListener('click', 
                    (e: MouseEvent) => {
                        const target = <HTMLLabelElement>e.target;
                        this.HandleSelectAssocation(target.getAttribute('value'));
                    });
                return label;
            });
    }

    // Selects the data from another template and loads it in the current template
    // @param {string} association - The new template data to be loaded
    private HandleSelectAssocation(association: string) {
        const dataSetsCon = document.querySelector('.DEV-WIDGET-DATA-SETS');
        const associations = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS').childNodes as NodeListOf<HTMLLabelElement>;
        const newAssociationElem = [...associations].find(a => a.getAttribute('value') === association);
        const currentlySelected = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS .DEV-WIDGET-SELECTED');
        
        if(currentlySelected) currentlySelected.classList.remove('DEV-WIDGET-SELECTED');
        if(newAssociationElem) newAssociationElem.classList.add('DEV-WIDGET-SELECTED');
        
        // Get the new data from the local storage
        this.templateData = this.TemplateStorage.GetTemplateData(association);
        // If we are viewing the current template's data
        if(association === this.TemplateStorage.templateName[0]) {
            this.associated = false;
            this.TemplateStorage.ModifyAssociation(null);
        } else {
            this.associated = true;
            this.TemplateStorage.ModifyAssociation(association);
        }
        // Re-Create the sata sets
        const options = this.GetDataOptions();
        const labelOptions = options
            .map(data => this.CreateDataLabel(data, !this.associated));
        [...dataSetsCon.childNodes].forEach(c => dataSetsCon.removeChild(c));
        labelOptions.forEach(l => dataSetsCon.appendChild(l));
        // If there is data, select it
        if(this.templateData.length) {
            this.ChangeDataSet(this.templateData[0].name);
            this.HandleLoadDataSet();
        } else {
            this.HandleLoadDataSet({});
        }
        this.UpdateWidgetOptions(this.GetDataOptions()); // Updates the widget's selectable data sets
    }
 
    // Loads a data set into the template data popup
    // @param {object} inputData - optional data to load instead of the selected data
    private HandleLoadDataSet(inputData?: {[index:string]: any}) {
        if(!this.templateData.length && !inputData) return; // Data is required
        const textArea = this.elem.querySelector('textarea');
        const templateData = this.templateData.find(d => d.name === this.selected);
        const parent = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const data = inputData !== undefined ? inputData : templateData.data;
        if(textArea.style.display === 'none') { // If we are in the GUI mode
            const dataCon = EncodeData(data);
            [...parent.childNodes].forEach(c => parent.removeChild(c));
            [...dataCon.childNodes].forEach(c => parent.appendChild(c));
            this.associated 
                ? parent.classList.add('DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED') 
                : parent.classList.remove('DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED');
        } else { // We are in JSON (textarea) mode
            textArea.value = JSON.stringify(data, null, 4);
        }
    }

    // Saves the current data set to the browser's local storage
    private HandleSaveDataSet() {
        if(this.associated) {
            this.LogMessage('Data can not be saved when being associated from another template');
            return;
        }
        const textArea = <HTMLTextAreaElement>this.elem.querySelector('textarea');
        if(textArea.style.display === 'flex') { // If we are in JSON mode, convert and save it
            this.HandleDisplayJSON(textArea);
            return;
        }
        const associationsCon = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS');
        const association = this.associations.findIndex(a => this.TemplateStorage.templateName[0] === a);
        const saveContainer = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME');
        const dataCon = <HTMLDivElement>this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const dataSetCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const saveIcon = this.elem.querySelector('.DEV-WIDGET-SAVE-ICON');
        const input = <HTMLInputElement>saveContainer.childNodes[0];
        const name = input.value.replace(/ /g, '-');
        if(!name) {
            this.LogMessage('Please enter a name for the data set');
            return;
        }
        let data = DecodeData({}, dataCon); // Decode the data from the DOM
        let found = this.templateData.findIndex(data => data.name === name);
        // Remove the data
        if(!Object.keys(data).length) { 
            this.HandleRemoveDataSet();
        // Add the data as a new data set (save as)
        } else if(found === -1) {
            this.templateData.push({name, data});
            const label = this.CreateDataLabel([name, input.value]);
            dataSetCon.appendChild(label);
            this.ChangeDataSet(name);
            this.UpdateWidgetOptions(this.GetDataOptions());
            this.SelectWidgetDataSet(this.selected);
        // Update the current data set
        } else {
            this.templateData[found].data = data;
        }
        if(!saveIcon.classList.contains('DEV-WIDGET-SAVED')) {
            saveIcon.classList.add('DEV-WIDGET-SAVED');
            setTimeout(() => saveIcon.classList.remove('DEV-WIDGET-SAVED'), 5000);
        }
        // If this template is not availible for assocacation and there is data
        if(association === -1 && this.templateData.length) {
            const associationLabel = this.CreateAssociationLabels([this.TemplateStorage.templateName[0]])[0];
            associationLabel.classList.add('DEV-WIDGET-SELECTED');
            this.associations.push(this.TemplateStorage.templateName[0]); // Make the current template assocaitable
            this.SetWidgetSetting('associations', this.associations); // Save the new association
            associationsCon.appendChild(associationLabel);
        } else if(!this.templateData.length) { // We are assocaited and there is no data
            const i = this.associations.findIndex(a => a === this.TemplateStorage.templateName[0]);
            this.associations.splice(i, 1); // Remove the current templates ability to be associated to
            associationsCon.removeChild(associationsCon.childNodes[i]);
            this.SetWidgetSetting('associations', this.associations);
        }
        this.TemplateStorage.SaveTemplateData(this.templateData);
        this.LogMessage(name.replace(/-/g, ' ') + ' has been updated successfully')
    }

    // Removes a data set from the current template
    private HandleRemoveDataSet() {
        const dataSetCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const found = this.templateData.findIndex(data => data.name === this.selected);
        const children = dataSetCon.childNodes as NodeListOf<HTMLLabelElement>;
        // Remove the data set label
        children.forEach(c => c.getAttribute('value') === this.selected ? dataSetCon.removeChild(c) : null);
        this.templateData.splice(found, 1); // Remove the data
        this.UpdateWidgetOptions(this.GetDataOptions()); // Update the widget options
        if(this.templateData.length) { // Select a new data set
            this.selected = found === 0 ? this.templateData[0].name : this.templateData[found - 1].name;
            this.HandleLoadDataSet();
            this.ChangeDataSet(this.selected);
        } else {
            this.selected = null;
        }
    }

    // Toogles the template data popup between GUI and JSON mode
    // @param {DOM Node} textArea - The text area used in the JSON mode
    private HandleDisplayJSON(textArea: HTMLTextAreaElement) {
        const dataCon = <HTMLDivElement>this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const display = textArea.style.display === 'none' ? false : true;
        
        if(display) { // We are currently in JSON mode
            // The data set's name
            const input = <HTMLInputElement>this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME input');
            textArea.style.display = 'none';
            dataCon.style.display = '';
            try {
                if(this.associated) {
                    this.HandleLoadDataSet(JSON.parse(textArea.value)); // Loads the inout data
                } else {
                    this.SetSelectedTemplateData(textArea.value, );
                }
            } catch (error) {
                textArea.style.display = 'flex';
                dataCon.style.display = 'none';
                if(error.message.includes('JSON')) this.LogMessage(error.message);
                return;
            }
        } else { // We are currently in GUI mode
            const found = this.templateData.findIndex(t => this.selected === t.name);
            textArea.value = found > -1 ? JSON.stringify(this.templateData[found].data, null, 4) : "{\n\r}";
            textArea.style.display = 'flex';
            dataCon.style.display = 'none';
        }
    }

    // Loads a data set before running the popup parent classes Open function
    public Open() {
        this.HandleLoadDataSet();
        super.Open();
    }
    
    // Gets all the avaible data sets
    // @returns {[string, string][]} - An array of raw and parsed data set names
    public GetDataOptions(): [string, string][] {
        return this.templateData.map(data => {
            return [data.name, data.name.replace(/-/g, ' ')];
        });
    }

    // Changes the currently selected data set
    // @param {string} val - The name of the data set to be selected
    public ChangeDataSet(val: string) {
        if(val === 'no-data') return;
        const dataSetsCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const leftCon = dataSetsCon.parentElement;
        const dataCon = leftCon.nextElementSibling;
        const nameInput = <HTMLInputElement>dataCon.lastElementChild.childNodes[0];
        const selected = dataSetsCon.querySelector('.DEV-WIDGET-SELECTED');
        // Remove the old selection class
        if(selected) selected.classList.remove('DEV-WIDGET-SELECTED');
        const labels = leftCon.childNodes[1].childNodes as NodeListOf<HTMLLabelElement>;
        // Find the element we clicked on or want to select
        const elem = [...labels].find(l => l.getAttribute('value') === val);
        if(!elem) throw new Error('Invalid data set selection');
        elem.classList.add('DEV-WIDGET-SELECTED');
        
        // Update the input, selected name, and load the data
        nameInput.value = val.replace(/-/g, ' ');
        this.selected = val;
    }

    // Gets the currently selected tempalte data
    // @returns {object} - The selected template data
    public GetTemplateData() {
        if(this.selected === null) return {name: '', data: {}};
        return this.templateData.find(data => data.name === this.selected);
    }

    // Selects a data set from any external script
    // @param {string} name - The data set's name
    public SelectTemplateData(name: string) {
        if(name.includes(' ')) name = name.replace(/ /g, '-');
        try {
            this.ChangeDataSet(name);
            this.SelectWidgetDataSet(this.selected);
            this.HandleLoadDataSet();
        } catch (error) {
            this.LogMessage('There was an error when selecting the data set ' + name);
            console.error(error);
        }
    }

    // Set's the currently selected tempalte data
    // @param {string} data - A stringifed version of the data to be set
    // @param {string} name - An optional name to use when saving the data
    public SetSelectedTemplateData(data: string, name?: string) {
        if(this.associated) { // Can't overwrite assocaited data
            this.LogMessage('Data can not be set when being associated from another template');
            return;
        }
        let parsed: {[index:string]: any};
        try { // Attempt to parse the data string
            parsed = JSON.parse(data);
        } catch (error) {
            this.LogMessage('Error parsing JSON data');
            return;
        }
        const select = name ? name : this.selected;
        let current = this.templateData.findIndex(d => d.name === select);
        if(current === -1) { // We could not find the data by name
            const input = <HTMLInputElement>this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME input');
            if(!input.value.length) {
                input.value = select ? select : 'New Data';
            } else if(name) {
                input.value = name;
            }
        } else { // The data does excist
            this.templateData[current].data = parsed;
        }
        this.HandleLoadDataSet(parsed); // Loads the inout data
        if(Object.keys(parsed).length) this.HandleSaveDataSet(); // Saves / updates the template data
    }
    // Assocaited this template to another template's data
    // @param {string} association - The name of the template being associated to
    public AssociateTemplateData(association?: string) {
        association = association !== undefined
            ? 'DEV-TEMPLATE-DATA-' + association 
            : this.TemplateStorage.templateName[0];
        if(this.associations.findIndex(a => a === association) > -1) {
            this.HandleSelectAssocation(association);
        } else {
            this.LogMessage('Cannot associate ' + association);
        } 
    }
}