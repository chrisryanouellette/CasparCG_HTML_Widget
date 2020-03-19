import CreateElement from '../ElementFactory';

interface InputProps {
    placeholder?: string;
    defaultValue?: string;
    id?: string;
    class?: string;
}

// Creates a input element
// @param {object} props - Some values for creating the input
// @returns {DOM Node} - The input element
export default function CreateInput(props?: InputProps): HTMLInputElement {
    const elem = <HTMLInputElement>CreateElement('input', props ? props.class : '');
    if(props !== undefined) {
        if(props.placeholder) elem.setAttribute('placeholder', props.placeholder);
        if(props.defaultValue) elem.value = props.defaultValue;
        if(props.id) elem.id = props.id;
    }
    return elem;
}