export default function CreateSaveIcon(): SVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(
`<svg class="DEV-WIDGET-SAVE-ICON" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Floppy Disk Cover -->
    <path d="M50,0 H80 L100 20 V80 Q100 100, 80 100 H20 Q0 100, 0 80 V20 Q0 0, 20 0 Z" />
    <!-- Floppy Disk Shutter -->
    <rect x="27.5%" y="0" width="45%" height="20%"/>
    <!-- Cover Hole -->
    <rect x="53%" y="0" width="12%" height="15%" />
    <!-- Body Background -->
    <rect x="20%" y="40%" width="60%" height="40%"/>
    <!-- Lines -->
    <g>
        <line x1="25%" y1="50%" x2="75%" y2="50%" stroke-width=".25vw"/>
        <line x1="25%" y1="57%" x2="75%" y2="57%" stroke-width=".25vw"/>
        <line x1="25%" y1="63%" x2="75%" y2="63%" stroke-width=".25vw"/>
        <line x1="25%" y1="70%" x2="75%" y2="70%" stroke-width=".25vw"/>
    </g>
</svg>`, 'text/html').querySelector('svg');
}