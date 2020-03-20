import CreateElement from '../ElementFactory';

interface LabelProps {
    text: string;
    htmlFor?: string;
    customElement?: HTMLElement;
}

// Creates a label element that has a custom click handler for selecting any element
// @param {object} props - Some values for creating the custom label
// @returns {DOM Node} - The label element
export default function CreateLabel(props: LabelProps): HTMLLabelElement {
    const elem = <HTMLLabelElement>CreateElement('label', 'DEV-WIDGET-LABEL');
    elem.textContent = props.text;
    if(props.htmlFor) elem.htmlFor = props.htmlFor;
    // Clicks a non stadard element
    if(props.customElement) 
        elem.addEventListener('click', () => props.customElement.click());
    return elem;
}