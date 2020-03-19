/* All of the play out controls (AMCP commands) for the widget */
// Factory Imports
import CreateElement from './ui/ElementFactory';
import CreateButton from './ui/form/Button';

import {TemplateDataInterface} from './storage/TemplateStorage';

// Redeclare the global.window object to allow string indexes
declare global {
    interface Window {
        [index: string]: (data?: string) => void
    }
}

interface PlayoutControlsInterface {
    ExecutePlayOutCommand: (cmd: string) => void;
}

interface PlayoutProps {
    logger: (msg: string) => void;
    getSelectedTemplateData: () => TemplateDataInterface;
}

// Class that plays global casparcg commands
export default class PlayoutControls implements PlayoutControlsInterface {
    private getSelectedTemplateData: () => TemplateDataInterface;
    // Function to display messags to the user through the Logger class
    private logMessage: (msg: string) => void;
    public elem: HTMLDivElement;

    constructor(props: PlayoutProps) {
        this.elem = <HTMLDivElement>CreateElement('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-PLAYOUT-CONTROLS'])
        this.ExecutePlayOutCommand = this.ExecutePlayOutCommand.bind(this);
        // Create the playout controls
        const playButton = CreateButton({classes: 'DEV-WIDGET-PLAY'});
        playButton.addEventListener('click', () => this.ExecutePlayOutCommand('play'));
        const nextButton = CreateButton({classes: 'DEV-WIDGET-NEXT'});
        nextButton.addEventListener('click', () => this.ExecutePlayOutCommand('next'));
        const stopButton = CreateButton({classes: 'DEV-WIDGET-STOP'});
        stopButton.addEventListener('click', () => this.ExecutePlayOutCommand('stop'));
        const updateButton = CreateButton({classes: 'DEV-WIDGET-UPDATE'})
        updateButton.addEventListener('click', () => this.ExecutePlayOutCommand('update'));

        this.elem.appendChild(playButton);
        this.elem.appendChild(nextButton);
        this.elem.appendChild(stopButton);
        this.elem.appendChild(updateButton);

        this.getSelectedTemplateData = props.getSelectedTemplateData;
        // Set the logger function
        this.logMessage = props.logger;
    }

    // Attempt to execute a playout command
    public ExecutePlayOutCommand(cmd: string): void {
        if(typeof window[cmd] !== 'function' 
        || (/\{\s*\[native code\]\s*\}/).test('' + window[cmd])) {
            // Display an error message for undefined commands
            this.logMessage(cmd + ' is not defined');
        } else {
            if(cmd === 'update') {
                // Gets the template data from the Settings Component
                const data = this.getSelectedTemplateData();
                window[cmd](JSON.stringify(data.data)) 
            } else {
                window[cmd]();
            }
        }
    }
}