// Changes a data row from one data type to another
// @param {DOM Node} select - The select element that staerted the change
export default function ChangeDataSection(select: HTMLElement) {
    const type = select.getAttribute('value');
    const row = select.parentElement;
    const children = [...row.childNodes as NodeListOf<HTMLInputElement>];

    // Reset elements for change
    children.slice(2, -1).map(e => e.style.display = 'none');
    children[2].value = '';

    // Hide / Show the components used in a Array and Object
    if(type === 'arr' || type === 'obj') {
        const nextRow = row.nextElementSibling;
        if(nextRow && nextRow.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')) {
            const children = [...nextRow.childNodes];
            if(type === 'arr') {
                children.forEach((c, i) => {
                    const key = <HTMLInputElement>c.childNodes[1];
                    key.style.display = 'none';
                    key.value = i.toString();
                });
            } else {
                children.forEach(c => {
                    const key = <HTMLInputElement>c.childNodes[1];
                    key.style.display = '';
                });
            }
        }
    }
    
    // Handle displaying required elements
    switch(type) {
        case 'obj':
        case 'arr':
            children[4].style.display = 'flex';
            break;
        case 'bool':
            children[3].style.display = 'flex';
            break;
        default:
            children[2].style.display = 'block';
            break;
    }
}