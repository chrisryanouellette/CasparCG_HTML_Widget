/* Handles logging the main errors for the widget */
// Factory Imports
import CreateElement from './ui/ElementFactory';

interface LoggerInterface {
    displayMessage: (msg: string) => void;
}

// Class that logs a message for the User
export default class Logger implements LoggerInterface {
    // Message to display
    private message: HTMLParagraphElement;
    // Timeout to determine how long to display the message for
    private messageTimeout: ReturnType<typeof setTimeout> = null;
    public elem: HTMLDivElement;

    constructor() {
        this.elem = <HTMLDivElement>CreateElement('div', 'DEV-WIDGET-LOGGER');
        // Create a paragraph element to hold the message
        this.message = <HTMLParagraphElement>CreateElement('p');
        this.message.textContent = '.';
        this.elem.appendChild(this.message);

        this.displayMessage = this.displayMessage.bind(this);
    }

    // Clears the current timeout and sets this.messageTimeout to null
    private clearTimer() {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = null;
    }

    // Displays a message
    public displayMessage(msg: string) {
        if(msg) {
            if(this.messageTimeout) this.clearTimer(); // Restart the timeout
            this.messageTimeout = setTimeout(this.displayMessage, 5000);
            this.message.textContent = msg;
            // Only toggle the class if it is not present
            if(!this.elem.classList.contains('DEV-WIDGET-SLIDE-DOWN'))
                this.elem.classList.add('DEV-WIDGET-SLIDE-DOWN'); 
        } else {
            this.clearTimer();
            this.elem.classList.remove('DEV-WIDGET-SLIDE-DOWN');
        }
    }
}