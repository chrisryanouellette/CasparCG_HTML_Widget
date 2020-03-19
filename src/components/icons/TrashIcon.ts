export default function CreateTrashIcon(): SVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(
`<svg class="DEV-WIDGET-TRASH-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer Circle -->
    <circle cx="50" cy="50" r="45" fill="none"/>
    <!-- Main Can -->
    <path d="M30,30 V70 Q30 75, 35 75 H65 Q70 75, 70 70 V30" height="55" />
    <!-- Lid -->
    <line x1="25" y1="30" x2="75" y2="30" stroke-linecap="round" />
    <!-- Handle -->
    <path d="M40 30 V25 Q40 20, 45 20 H55 Q60 20, 60 25 V30" fill="none" />
    <!-- Lines -->
    <g>
        <line x1="40" y1="40" x2="40" y2="65" stroke-linecap="round" />
        <line x1="50" y1="38" x2="50" y2="68" stroke-linecap="round" />
        <line x1="60" y1="40" x2="60" y2="65" stroke-linecap="round" />
    </g>
</svg>`, 'text/html').querySelector('svg');
}