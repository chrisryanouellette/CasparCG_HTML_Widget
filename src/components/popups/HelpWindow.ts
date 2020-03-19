import Popup from '../ui/Popup';
import CreateParagraph from '../ui/Paragraph';
import CreateLabel from '../ui/form/Label';

export default class Help extends Popup {
    constructor() {
        super();
        this.elem.classList.add('DEV-WIDGET-HELP');

        this.body.appendChild(CreateLabel({text: 'Position:'}));
        this.body.appendChild(CreateParagraph({
            text: 'Can be a Keyword (Top, Bottom, Left, Right) or a pixel value (200px 200px)'
        }));

        this.body.appendChild(CreateLabel({text: 'Background Color:'}));
        this.body.appendChild(CreateParagraph({
            text: 'Can be either a rgb value (0,0,0), rgba value (0,0,0,1), or a 3 or 6 digit hex value (#123 or #123123)'
        }));

        this.body.appendChild(CreateLabel({text: 'Custom Command:'}));
        this.body.appendChild(CreateParagraph({
            text: 'Any function defined on the window object (global function)'
        }));

        this.body.appendChild(CreateLabel({text: 'Custom Data:'}));
        this.body.appendChild(CreateParagraph({
            text: 'Use the Plus, Minus, and Trash icons to add to, remove from, and delete entire data sets.'
        }));
        this.body.appendChild(CreateParagraph({
            text: 'The select menus on the left side of each row will modify the data type.'
        }));
        this.body.appendChild(CreateParagraph({
            text: 'Only rows with a value for the key and value inputs will be saved. Arrays are auto indexed.'
        }));
        this.body.appendChild(CreateParagraph({
            text: 'Give the data set a name with the input at the bottom and click the save icon.'
        }));
        this.body.appendChild(CreateParagraph({
            text: 'Data from other tamplates can be loaded under the assocations panel (Right hand side).'
        }));
    }
}