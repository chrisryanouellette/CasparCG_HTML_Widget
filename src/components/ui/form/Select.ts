import CreateElement from '../ElementFactory';
import CreateLabel from './Label';
import CreateArrowIcon from '../../icons/ArrowIcon';

interface SelectProps {
    options: [string, string][];
    defaultValue?: [string, string];
    offsetOnly?: boolean;
}

// Creates a custom select element
// @param {object} props -  An object defining the select's options and optional default value 
//                          and if the selections options should be offset via the page or parent element
// @returns {DOM Node} - A div element that is styled and coded to act like a select element
export default function CreateSelect(props: SelectProps): HTMLDivElement {
    // Create main container
    const elem = <HTMLDivElement>CreateElement('div', 'DEV-WIDGET-SELECT');
    
    // Create Selected Text
    const selectedContainer = CreateElement('div', 'DEV-WIDGET-SELECTED');
    const selectedText = props.defaultValue ? props.defaultValue : props.options[0];
    const selected = CreateLabel({text: selectedText[1]});
    elem.setAttribute('value', selectedText[0]);
    selectedContainer.appendChild(selected);
    selectedContainer.appendChild(CreateArrowIcon());

    const event = new CustomEvent('change');

    // Create options container
    const options = CreateElement('ul');
    options.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLLIElement;
        const selected = elem.childNodes[0].childNodes[0] as HTMLLabelElement;
        const opt = [target.getAttribute('value'), target.textContent];
        // Click was not an option
        if(target.nodeName !== 'LI') {
            e.stopPropagation();
            return;
        }
        // Set the label displaying the selected option
        elem.setAttribute('value', opt[0]);
        selected.textContent = opt[1];
        // Dispack the change event
        elem.dispatchEvent(event);
    });
    // Create options
    props.options.map(o => {
        const opt = CreateElement('li');
        opt.setAttribute('value', o[0]);
        opt.textContent = o[1];
        options.appendChild(opt);
    });

    elem.appendChild(selectedContainer);
    elem.appendChild(options);

    // Open or close the select
    elem.addEventListener('click', function(e: MouseEvent) {
        elem.classList.contains('DEV-WIDGET-SELECT-OPEN') 
            ? elem.classList.remove('DEV-WIDGET-SELECT-OPEN')
            : elem.classList.add('DEV-WIDGET-SELECT-OPEN');
        options.style.top = props.offsetOnly 
            ? '1.5vw' : e.pageY + 'px';
    });
    elem.addEventListener('mouseleave', 
        () => elem.classList.remove('DEV-WIDGET-SELECT-OPEN'));

    return elem;
}