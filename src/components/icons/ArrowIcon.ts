export default function CreateArrowIcon(): SVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(
`<svg class="DEV-WIDGET-ARROW-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 H90 Q100 0, 100 10 V90 Q100 100, 90 100 H0 Z" />
    <path d="M25 25 H75 L50 75 Z" />
</svg>`, 'text/html').querySelector('svg');
}