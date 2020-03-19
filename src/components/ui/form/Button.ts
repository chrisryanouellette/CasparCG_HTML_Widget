import CreateElement from '../ElementFactory';

interface ButtonProps {
    text?: string;
    classes?: string | string[]
}

// Creates a button element 
// @param {object} props - Some values for creating the button
// @returns {DOM Node} - The button element
export default function CreateButton(props?: ButtonProps): HTMLButtonElement {
    const button = CreateElement('button', props ? props.classes : undefined) as HTMLButtonElement;
    if(props) button.textContent = props.text;
    return button;
}
