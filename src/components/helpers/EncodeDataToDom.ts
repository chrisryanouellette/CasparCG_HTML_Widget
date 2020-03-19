import CreateElement from '../ui/ElementFactory';
import CreateDataRow from './CreateDataRow';

// Takes an object and converts it to a DOM representation
// @param {object} obj - The data to be converted
// @returns {DOM Node} - The data represneted as DOM Nodes
export default function EncodeData(obj: {[index: string]: any}) {
    const container = CreateElement('div');
    container.classList.add('DEV-WIDGET-TEMPLATE-DATA-CON');

    Object.entries(obj).forEach(([key, val]) => {
        let elem: HTMLElement;
        let children: HTMLElement;
        // Handle Array
        if(Array.isArray(val)) {
            elem = CreateDataRow('arr', key);
            children = EncodeData(val);
            children.childNodes.forEach(c => {
                const con = <HTMLDivElement>c;
                if(con.classList.contains('DEV-WIDGET-TEMPLATE-DATA-ITEM')) {
                    const input = <HTMLElement>con.childNodes[1];
                    input.style.display = 'none';
                }
            });
        // Handle Object
        } else if(typeof val === 'object') {
            elem = CreateDataRow('obj', key);
            children = EncodeData(val);
        } else {
            if(typeof val === 'boolean') { // Handle Booleans
                elem = CreateDataRow('bool', key, String(val));
            } else { // Handle Text and Numbers
                elem = typeof val === 'string' 
                    ? CreateDataRow('text', key, val) 
                    : CreateDataRow('num', key, String(val));
            }
        }
        container.appendChild(elem);
        if(children) container.appendChild(children);
    });
    return container;
}