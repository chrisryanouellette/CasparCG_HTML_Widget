export default function CreatePlusIcon(): SVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(
`<svg class="DEV-WIDGET-PLUS-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45"/>
    <line x1="50" y1="25" x2="50" y2="75"/>
    <line x1="25" y1="50" x2="75" y2="50"/>
</svg>`, 'text/html').querySelector('svg');
}