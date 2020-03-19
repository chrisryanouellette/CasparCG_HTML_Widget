import CreateElement from './ElementFactory';

interface ParagraphProps {
    text: string,
    classes?: string | string[]
}

export default function CreateParagraph(props: ParagraphProps): HTMLParagraphElement {
    const elem = <HTMLParagraphElement>CreateElement('p', props.classes);
    elem.textContent = props.text;
    return elem;
}