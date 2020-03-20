export default function CreateElement(type: string, classes?: string | string[]): HTMLElement {
    const elem = document.createElement(type);
    if(classes !== undefined) {
        if(Array.isArray(classes)) {
            classes.forEach(c => elem.classList.add(c));
        } else {
            elem.classList.add(classes);
        }
    }
    return elem;
}