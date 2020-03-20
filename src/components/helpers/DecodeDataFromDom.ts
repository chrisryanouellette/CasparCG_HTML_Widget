// Takes in a set of DOM node representing an object 
// and converts them into a JS object
// @param {any} obj - The starting object
// @param {DOM Node} con - The container with the elements to be converted
// @returns {object} - The JS object
export default function DecodeData(obj: any, con: HTMLDivElement) {
    con.childNodes.forEach(node => {
        const child = node as HTMLDivElement;
        const nodes = child.childNodes as NodeListOf<HTMLInputElement>
        const type = nodes[0].getAttribute('value');
        // Return (Skip) the container if a sub container is found
        if(child.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')) return obj;
        // Arrays and object are broken down further
        if(type === 'arr' || type === 'obj') {
            const section = child.nextElementSibling as HTMLDivElement;
            const parent = type === 'arr' ? [] : {}
            const key = nodes[1].value;
            if(section) {
                Array.isArray(obj) 
                    ? obj.push(DecodeData(parent, section))
                    : obj[key] = DecodeData(parent, section);
            } else {
                Array.isArray(obj) ? obj.push(parent) : obj[key] = parent;
            }
        // Booleans, numbers, and text are added to the current object
        } else {
            let val;
            // True / false value
            if(type === 'bool') {
                val = nodes[3].classList.contains('DEV-WIDGET-CHECKED') ? true : false;
            // Text or number value
            } else {
                type === 'num' ? val = Number(nodes[2].value) : val = nodes[2].value;
                if(val.toString().length === 0) return;
            }
            Array.isArray(obj) ? obj.push(val) : obj[nodes[1].value] = val;
        }
    });
    return obj;
}