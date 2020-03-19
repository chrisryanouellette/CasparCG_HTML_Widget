import CreateElement from '../ElementFactory';

// Creates a div element that is styled and coded to act like a checkbox
// @param {object} props - Some values for creating the custom checkbox
// @returns {DOM Node} - The div element
export default function CreateCheckbox(): HTMLDivElement {
    const elem = <HTMLDivElement>CreateElement('div', 'DEV-WIDGET-CHECKBOX');
    elem.addEventListener('click', () => {
        elem.classList.contains('DEV-WIDGET-CHECKED') 
            ? elem.classList.remove('DEV-WIDGET-CHECKED')
            : elem.classList.add('DEV-WIDGET-CHECKED')
    });
    return elem;
}