export default function CreateDraggableIcon(): SVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(
`<svg class="DEV-WIDGET-DRAGABLE-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="25" x2="85" y2="25" stroke-linecap="round"/>
    <line x1="15" y1="50" x2="85" y2="50" stroke-linecap="round"/>
    <line x1="15" y1="75" x2="85" y2="75" stroke-linecap="round"/>
</svg>`, 'text/html').querySelector('svg');
}