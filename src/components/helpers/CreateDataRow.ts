// Factory Imports
import CreateElement from '../ui/ElementFactory';
import CreateSelect from '../ui/form/Select';
import CreateInput from '../ui/form/Input';
import CreateCheckbox from '../ui/form/Checkbox';
import CreateButton from '../ui/form/Button';
import CreatePlusIcon from '../icons/PlusIcon';
import CreateMinusIcon from '../icons/MinusIcon';

// Helper Functions
import ChangeDataRow from './ChangeDataRow';
import RemoveDataRow from './RemoveDataRow';

// Creates a new data row for the Template data popup
// @param {string} type - The type of row being created
// @param {string?} k - The key value to be set
// @param {string?} v - The value to be set
// @returns {DOM Node} - The data row as a Div element
export default function CreateDataRow(type: string, k?: string, v?: string): HTMLElement {
    const container = CreateElement('div', 'DEV-WIDGET-TEMPLATE-DATA-ITEM');
    const options: [string, string][] = [
        ['text', 'Text'], 
        ['num', 'Number'], 
        ['bool', 'True/False'], 
        ['arr', 'Array'],
        ['obj', 'Object']
    ];
    // Create the row's data type selector
    const selected = options.find(o => o[0] === type);
    const select = CreateSelect({options: options, defaultValue: selected});
    select.addEventListener('change', (e: CustomEvent) => ChangeDataRow(select));
    
    // Create the rows data key's and values
    const key = CreateInput({placeholder: 'Key'});
    const value = CreateInput({placeholder: 'Value'});
    const checkbox = CreateCheckbox();
    
    // Create the blus button and icon
    const addButton = CreateButton();
    addButton.appendChild(CreatePlusIcon());
    addButton.addEventListener('click', () => { // Add new child row
        const parent = container.parentElement;
        let newCon;
        if(container.nextElementSibling) {
            newCon = container.nextElementSibling.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')
                ? container.nextElementSibling
                : CreateElement('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        } else {
            newCon = CreateElement('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        } 
        newCon.appendChild(CreateDataRow('text'));
        if(select.getAttribute('value') === 'arr') {
            const key = <HTMLInputElement>newCon.lastElementChild.childNodes[1];
            key.style.display = 'none';
            key.value = newCon.childElementCount.toString();
        }
        container.nextElementSibling
            ? parent.insertBefore(newCon, container.nextElementSibling)
            : parent.appendChild(newCon);
    });

    // Create remove button and icon
    const removeButton = CreateButton();
    removeButton.appendChild(CreateMinusIcon());
    removeButton.addEventListener('click', (e: Event) => 
        RemoveDataRow(<HTMLDivElement>container))

    // Show / Hide elements based on row type
    switch(type) {
        case 'bool':
            value.style.display = 'none';
            addButton.style.display = 'none';
            if(v === 'true') checkbox.classList.add('DEV-WIDGET-CHECKED')
            break;
        case 'arr':
        case 'obj':
            checkbox.style.display = 'none';
            value.style.display = 'none';
            break;
        default:
            checkbox.style.display = 'none';
            addButton.style.display = 'none';
            break;
    }

    // When a value is added, check the type and make sure the value matches it
    value.addEventListener('blur', (e: Event) => {
        if(select.getAttribute('value') !== 'num') return;
        const target = e.target as HTMLInputElement;
        if(isNaN(Number(target.value))) {
            target.value = '';
        }
    });
    // Set the optional key and value for the row
    if(k !== undefined) key.value = k;
    if(v !== undefined) value.value = v;

    container.appendChild(select);
    container.appendChild(key);
    container.appendChild(value);
    container.appendChild(checkbox);
    container.appendChild(addButton);
    container.appendChild(removeButton);

    return container;
}
