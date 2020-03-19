// Removes a row from the template data popup
// @param {DOM Node} row - The row to be removed
export default function RemoveDataRow(row: HTMLDivElement) {
    const parent = row.parentElement;
    const select = row.childNodes[0] as HTMLElement;
    const type = select.getAttribute('value');

    if(type === 'obj' || type === 'arr') {
        const next = row.nextElementSibling;
        if(next && next.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')) 
            parent.removeChild(next);
    }
    parent.removeChild(row);
}