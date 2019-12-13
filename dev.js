'use strict';

/*
    CasparCG Developer Widget
    Originally Created By Christopher Ouellette
    Please feel free to suggest add ons, re-work the entire widget or, anything in between!
    Got a cool addition, please reach out!
*/

// Global variable that acts as API
const DEVWIDGET = (function() {
    // Indexed DB information
    const DB = {
        DB_NAME: 'dev-widget',
        DB_VERSION: 1,
        DB_STORE_NAME: 'template-data',
        db: null
    }

    // If the app has loaded the widget and the css as well as atached the needed event listeners.
    let initialized = false,
    // If we are dragging the widget
        dragging = false,
    // The data used by the widget
        devData = {
            position: [0,0]
        },
        // The templates data loaded from IndexedDB
        templateData = {},
        // The users preferences
        userPrefs = {
            // Determines if we should log an update to the console
            displayUpdates: true,
            // Determines if the update command should be called when the widget is done initializing
            callUpdateOnLoad: false,
            // Display data as json or GUI
            displayTemplateAsGui: true
        }

    // Check for and load HTML and CSS
    function initializeRawHTML() {
        return new Promise((resolve, reject) => {
            // Waits till the CSS styles have appied
            const checkDOM = () => {
                const height = window.getComputedStyle(document.querySelector('.dev-widget')).getPropertyValue('height');
                const width = window.getComputedStyle(document.querySelector('.dev-widget')).getPropertyValue('width');
                if(height.replace('px', '') < 250 || width.replace('px', '') == 1920) {
                    window.requestAnimationFrame(checkDOM); 
                } else {
                    // The computed styles of the widget
                    devData.widget = getElemComputedStyles({
                        elem: '.dev-widget', 
                        attrs: ['width', 'height', 'margin'], 
                        ops: 'all'
                    });
                    // Get the widgets total sizes
                    devData.widget.totalHeight = devData.widget.height + (devData.widget.margin * 4);
                    devData.widget.totalWidth = devData.widget.width + (devData.widget.margin * 4);
                    return resolve();
                }
            }

            // attempt to load the widget
            try {
                const parser = new DOMParser();
                const html = document.querySelector('html');
                let head = html.querySelector('head'),
                    body = html.querySelector('body');

                if(!head) head = html;
                if(!body) body = html;

                // Check for a pre loaded Dev Widget
                if(!html.querySelector('.dev-widget')) {
                    // Parse the Raw HTML as HTML Document
                    const widgetHTML = parser.parseFromString(getRAWHTML(), "text/html");
                    body.append(widgetHTML.querySelector('.dev-widget'));
                } else {
                    console.warn('An dev widget was pre-loaded in the DOM');
                }
                if(!head.querySelector('link[href*="dev.css"]')) {
                    const styleHTML = parser.parseFromString(getRAWCSS(), "text/html"),
                        style = styleHTML.querySelector('style');
                    head.append(style);
                } else {
                    console.warn('A dev.css file was pre-loaded in the DOM');
                }

                checkDOM();
            } catch (error) {
                console.warn(error);
                return reject();
            }
        });
    }

    // Try and add all the event inital listeners for widget
    function initializeAttributes() {
         try {

            // Event listeners for playout buttons
            modifyAttrValues(['.dev-widget-control', '.dev-widget-update', '.dev-widget-custom-command-button'], {
                all: true,
                type: 'event',
                attr: 'click',
                value: runPlayoutCommand
            });

            // Event Listeners for all input updates
            modifyAttrValues('.dev-widget-position', {type: 'event', attr: 'blur', value: updateWidgetPosition});
            modifyAttrValues('.dev-widget-background-color', {type: 'event', attr: 'blur', value: updateBackgroundColor});
            modifyAttrValues('.dev-widget-custom-command', {type: 'event', attr: 'blur', value: updateCustomCommand});


            // Event Listeners for button clicks
                // Updates the widgets visibility
            modifyAttrValues('.dev-widget-visibility button', {type: 'event', all: true, attr: 'click', value: updateDisplay})
                // Updates if the widget should be in a dragging state
            modifyAttrValues('.dev-widget-widget', {type: 'event', attr: 'mouseup', value: toggleDragWidget});
            modifyAttrValues(['.dev-widget-visibility button','.dev-widget-position-con button'], {
                type: 'event',
                all: true,
                attr: 'mousedown',
                value: toggleDragWidget
            });

                // Opens, edits, and saves all template data
            modifyAttrValues(['.dev-widget-update-data', '.dev-widget-update-controls button:first-of-type'], {
                all: true,
                type: 'event',
                attr: 'click',
                value: toggleEditTempateData
            });
            modifyAttrValues('.dev-widget-data-header button', {type: 'event', attr: 'click', value: importTemplateData});
            modifyAttrValues('.dev-widget-add-value .dev-widget-new-item', {type: 'event', attr: 'click', value: modifyTemplateDataField});
            modifyAttrValues('.dev-widget-update-controls button:last-of-type', {type: 'event', attr: 'click', value: saveTemplateData});
            modifyAttrValues('.dev-widget-add-value .dev-widget-convert', {type: 'event', attr: 'click', value: convertTemplateData});
            
                // Shows where to find help
            modifyAttrValues('.dev-widget-help', {type: 'event', attr: 'click', value: showHelp});
            
                // Opens, edits, and saves all user prefrences
            modifyAttrValues(['.dev-widget-settings', '.dev-widget-update-prefs-controls button'], {type: 'event', attr: 'click', value: toggleEditSettings});
            modifyAttrValues('.dev-widget-update-prefs-controls button:last-of-type', {type: 'event', attr: 'click', value: saveUserPreference});
            
        } catch (error) {
            return console.error(`Error attaching event listeners to widget. ${error.message}`);
        }
    }

    //Checks to make sure that all the required playout functions are defined
    function initializePlayoutFunction() {
        const commands = ['update', 'play', 'next', 'stop'];
        try {
            const missing = commands.filter(item => {
                // If it are not a function on the global scope or are native code, it are missing
                if(typeof window[item] !== 'function' 
                || (/\{\s*\[native code\]\s*\}/).test('' + window[item])) return true;
                return false;
            });
            // Throw error for missing functions
            if(missing.length) throw new Error(missing.join(', '));
        } catch (error) {
            console.error(`Template is missing required playout commands: ${error.message}`)
        }
    }

    // Gets all the stored template data and 
    // sets templateData equal to the data for this web page
    async function initailizeTemplateData() {
        // Get all the stored template data
        await getTemplateData(null).then(results => {
            if(!results) return;
            const select = document.querySelector('.dev-widget-other-data');
            const location = window.location.pathname.substring(1).replace(/\//g, '-');
            // Find the inde of the data for this template
            const index = results.findIndex(i => i.location === location);
            if(index !== -1) {
                templateData = results.splice(index, 1)[0];
            } else {
                console.warn(`${location} does not have any template data`);
            }
            // Add any additonal data options to the import select element
            results.length && results.forEach(i => {
                const option = document.createElement('option');
                option.value = i.location;
                option.textContent = i.name;
                select.append(option);
            });
        })
        .catch(error => {
            return console.error(error);
        });
    }

    // Sets the input values in the .dev-widget-settings-con to their correct values
    // @param {object} prefs - The users widget preferences
    function initializeUserPreferences(prefs) {
        try {
            Object.keys(prefs).forEach(item => {
                const input = document.querySelector(`.dev-widget-settings-con input[name=${item}]`);
                if(!input) console.error(`Could not set user prefrence for ${item}`);
                input.checked = prefs[item];
            });
        } catch (error) {
            console.error('Something went wrong when setting the user prefences');
        }
        
    }

    // Initialize all the needed components to make the widget run
    async function initializeDevEnv() {
        // Test the envioment variable to detemine if the widgit should continue loading.
        try {
            if(window.location.search) {
                // The url param to use to consider dev ENV
                const regex = new RegExp('[\\?&]' + 'debug' + '=([^&#]*)');
                const results = regex.exec(location.search);
                const value = results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
                // Warn if debug was in the url and it was not set to DEV
                if(value && value !== 'true')
                    throw 'Template url is set to Production';
            } else if(ENV !== 'DEV') {
                throw new Error('Template enviorment is not set to DEV');
            }
        } catch (error) {
                return typeof error === 'object' 
                    ? console.error(error) : console.warn(error);  
        }
        
        // Load HTML and CSS and wait for the styles to apply.
        await initializeRawHTML();
        // Add onClick and other events to the widget's elements
        initializeAttributes();
        // Opens and revieves all the templte data stored in the Browser's IndexedDB
        await opendDBConnection();
        await initailizeTemplateData();
        // Check the global scope for the required playout commands. update, play, next, stop
        initializePlayoutFunction();
        

        // Attempt to load data from the local storage
        try {
            if(!localStorage.length) throw new Error();
            devData = JSON.parse(localStorage.getItem('devWidget'));
            if(!Object.keys(devData).length) throw new Error({message: 'Dev Data storaged in local storage has no keys'});
            if(devData.userPrefs) {
                userPrefs = compareObjects(devData.userPrefs, userPrefs);
            } 
        } catch(e) {
            devData = {};
            if(Object.keys(e).length) return console.error('Error finding Dev Data', e);
            console.warn(`
Welcome to CasparCG HTML Developer Widget.
To begin, simply click a playout command, enter a custom command, or set a background color using a HEX, RGB, or RGBA value.
The position input can work with or without commas, a space is required at minimum.`
            );
        }
        
        try {
            // Call all the function there is data for
            if(Object.keys(devData).length) {
                updateBackgroundColor(devData.backgroundColor);
                updateDisplay(devData.display);
                updateCustomCommand(devData.customCommand);
                updateWidgetPosition(devData.position);
            }
            initializeUserPreferences(userPrefs);
        } catch (error) {
            return console.error('An error occured when setting the template data. ' + error);
        }

        // Set the apps state to initailized
        initialized = true;

        // Run the update command if the preferneces require it
        if(userPrefs.callUpdateOnLoad) {
            if(!Object.keys(templateData).length) return console.error("This template has no data. Us the 'Update Data' button to add some.");
            return update(JSON.stringify(templateData.data));
        }
    }

    // Compares the update sent and current data and saves it to local storage
    // @param {object} update - The new updates to be saved
    function saveWidgetData(update) {
        if(!initialized) return;
        try {
            devData = compareObjects(update, JSON.parse(localStorage.getItem('devWidget')));
            localStorage.setItem('devWidget', JSON.stringify(devData));
        } catch (error) {
            return console.error('Error attempting to save dev data');
        }
    }

    // Updates the current look of the widget
    // @param {string || object} e - An event object or string that has the name of the look to show
    function updateDisplay(e) {
        if(!e) return console.error('No display passed to update widget display');
        if(e.target) {
            e.stopPropagation();
            e = e.target.name;
        }
        const devWidget = document.querySelector('.dev-widget'),
            classList = devWidget.classList;

        // If we are trying to hide or show the widget
        if(e.includes('hide')) {
            if(!classList.contains('dev-widget-display-hide')) {
                if(classList.contains('dev-widget-display-invisible')) {
                    classList.remove('dev-widget-display-visible');
                }
                classList.add('dev-widget-display-hide');
                classList.remove('dev-widget-display-open', 'dev-widget-display-shrink');
            } else {
                e = 'open';
            }
        }
        // If we are trying to hide or show the widget
        if(e.includes('open')) {
            // Show the widget
            if(!classList.contains('dev-widget-display-invisible')) {
                classList.add('dev-widget-display-visible');
            }
            classList.remove('dev-widget-display-hide', '.dev-widget-display-shrink');
            classList.add('dev-widget-display-open');
        } 
        // If we are trying to shrink or unshrink the widget
        if(e.includes('shrink')) {
            if(classList.contains('dev-widget-display-shrink')) {
                classList.remove('dev-widget-display-shrink');
                classList.add('dev-widget-display-open');
            } else {
                classList.add('dev-widget-display-shrink');
                classList.remove('dev-widget-display-open', 'dev-widget-display-hide');
            }
        }
        // If we are trying to add or remove the background to the widget
        if(e.includes('visible')) {
            let val = devData.backgroundColor ? devData.backgroundColor : '#fff';
            if(val.includes('https')) val = '#fff';
            const invert = adjustColor(val, {invert: true});
            // Show the widget
            if(classList.contains('dev-widget-display-invisible') || (!e.includes('invisible') && !initialized)) {
                devWidget.style.backgroundColor = invert;
                classList.remove('dev-widget-display-invisible');
                classList.add('dev-widget-display-visible');
                modifyAttrValues(['.dev-widget-widget button', '.dev-widget-info a'], {
                    all: true, 
                    type: 'style', 
                    attr: 'color', 
                    value: val
                });
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'borderBottom', value: '2px solid transparent'});
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'backgroundColor', value: val});
            } else {
                devWidget.style.backgroundColor = 'transparent';
                classList.add('dev-widget-display-invisible');
                classList.remove('dev-widget-display-visible');
                modifyAttrValues(['.dev-widget-widget button', '.dev-widget-info a'], {all: true, type: 'style', attr: 'color', value: invert});
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'borderBottom', value: `2px solid ${invert}`});
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'backgroundColor', value: 'transparent'});
            }
        // Update the widgets size to reflect the changes above
        } else {
            // The computed styles of the widget
            devData.widget = getElemComputedStyles({
                elem: '.dev-widget', 
                attrs: ['width', 'height', 'margin'], 
                ops: 'all'
            });
            // Get the widgets total sizes
            devData.widget.totalHeight = devData.widget.height + (devData.widget.margin * 4);
            devData.widget.totalWidth = devData.widget.width + (devData.widget.margin * 4);
        }
        const display = classList.toString();
        // Save the data
        return saveWidgetData({display});
    }
    //Can exept Top, Bottom, Right, Left, and or a set of pixel values
    // @param {object} top position, right position - The positions of the widget
    function updateWidgetPosition(positions) {
        if(!positions) return console.error('No positions passed to update widget position');
        if(positions.target) positions = positions.target.value;
        try {
            const devWidget = document.querySelector('.dev-widget');
            if(typeof positions === 'string') {
                // Chack for commas or spaces
                positions = positions.replace(/,/g, '').trim();
                if(positions.indexOf(' ') > 0) {
                    positions = positions.split(/,|\s/g).filter(i => i && i.trim()).slice(0,2);
                } else if(positions.length > 0) {
                    positions = [positions, positions];
                }
            } else if(typeof positions === 'object' && !Array.isArray(positions)) {
                // Check for top and left values on the object, else set to 0
                const arr = [];
                arr[0] = positions.top ? positions.top : 0 ;
                arr[1] = positions.left ? positions.left : 0;
                positions = arr;
            }
            if(!positions) throw new Error('Error with position input. ' + positions);
            if(!devData.widget) {
                // The computed styles of the widget
                devData.widget = getElemComputedStyles({
                    elem: '.dev-widget', 
                    attrs: ['width', 'height', 'margin'], 
                    ops: 'all'
                });
                // Get the widgets total sizes
                devData.widget.totalHeight = devData.widget.height + (devData.widget.margin * 4);
                devData.widget.totalWidth = devData.widget.width + (devData.widget.margin * 4);
            }
            
            // Get a PX value for each position
            const convertedPostions = convertPositions(positions);

            // Set the devWidget's positions
            devWidget.style.top = convertedPostions.top + 'px';
            devWidget.style.left = convertedPostions.left + 'px';

            // Set the input's value
            document.querySelector('.dev-widget-position').value = `${positions[0]}, ${positions[1]}`;

            // Update the dev data
            devData.widget.positions = convertedPostions; 

            // If we aren't dragging the widget, save the data
            if(!dragging) {
                return saveWidgetData({position: positions});
            }

        } catch (error) {
            let message = typeof error === 'object' ? error.message : error;
            return console.error(`There was an error setting the widgets positions. ${message}`);
        }
    }

    // Moves the widget if we are dragging it
    // @param {object} e - The event object that tests the the mouse position
    function dragWidget(e) {
        if(dragging) {
            return updateWidgetPosition([e.clientY - 50, e.clientX - 50])
        }
    }

    // Toggles whether the widget is being dragged or not.
    // @param {object} e - The event object to test to seeif we should start dragging the widget
    function toggleDragWidget(e) {
        if(e.preventDefault) e.preventDefault();
        if(e.type === 'mousedown') {
            dragging = true;
            setTimeout(() => dragging && document.addEventListener('mousemove', dragWidget), 100);
        } else if(dragging) {
            let position = document.querySelector('.dev-widget').style.top;
            position = position.substring(0, position.indexOf('px'));
            dragging = false;
            document.removeEventListener('mousemove', dragWidget);
            if(!devData.position || position != devData.position[0])
                return saveWidgetData({position: [e.clientY - 50, e.clientX - 50]});
        }
    }

    // Updates the widget and body's background color
    // @param {string || object} e - An event object or string that contains the color to update the background to
    function updateBackgroundColor(e) {
        if(!e) return console.error('No value supplied for updateBackgroundColor');
        try {
            let rawValue = e.target ? e.target.value : e;
            if(!rawValue) {
                rawValue = '#fff';
            } else {
                document.querySelector('.dev-widget-background-color').value = rawValue;
            }
            // If the value is a url, set the background image to the url
            if(rawValue.includes('http')) {
                document.querySelector('body').style.backgroundImage = `url(${rawValue})`;
                return saveWidgetData({backgroundColor: `${rawValue}`});
            }
            // Get the inverted color of the set background color
            const val = adjustColor(rawValue, {});
            if(!val) throw 'Invalid Background Color';
            const invert = adjustColor(val, {invert: true});
            
            document.querySelector('body').style.backgroundColor = val;
            document.querySelector('body').style.backgroundImage = null;
            if(!document.querySelector('.dev-widget').classList.contains('dev-widget-display-invisible')) {
                document.querySelector('.dev-widget').style.backgroundColor = invert;
                modifyAttrValues(['.dev-widget-widget div:not(.dev-widget-controls) button', '.dev-widget-info a'], {
                    all: true,
                    type: 'style',
                    attr: 'color',
                    value: val
                });
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'backgroundColor', value: val});
                modifyAttrValues(['.dev-widget-widget input', '.dev-widget-display-message p'], {all: true, type: 'style', attr: 'color', value: invert});
            } else {
                modifyAttrValues(['.dev-widget-widget div button', '.dev-widget-info a'], {
                    all: true,
                    type: 'style',
                    attr: 'color',
                    value: invert
                });
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'backgroundColor', value: 'transparent'});
                modifyAttrValues('.dev-widget-widget input', {all: true, type: 'style', attr: 'borderBottom', value: `2px solid ${invert}`});
                modifyAttrValues(['.dev-widget-widget input', '.dev-widget-display-message p'], {all: true, type: 'style', attr: 'color', value: invert});
            }
            
            return saveWidgetData({backgroundColor: rawValue});
        } catch(error) {
            displayMessage(error);
            return console.error(error);
        }
    }

    // Saves the custom command value to the local storage
    function updateCustomCommand(e) {
        if(!e) return;
        if(e.target) {
            e = e.target.value;
        } else {
            document.querySelector('.dev-widget-custom-command').value = e;
        }
        return saveWidgetData({customCommand: e});
    }

    // If the command is defined, it runs a playout command 
    // @param {object} e - The event object of the button pressed to play the command
    function runPlayoutCommand(e) {
        if(e.target.name === 'customCommand') {
            if(!devData.customCommand) return;
            if(typeof window[devData.customCommand] === 'function') return window[devData.customCommand]();
            displayMessage(`Unable to execute '${devData.customCommand}' custom command`);
            return console.error(`Unable to execute '${devData.customCommand}' custom command`);
        } 
        if(typeof window[e.target.name] !== 'function' 
        || (/\{\s*\[native code\]\s*\}/).test('' + window[e.target.name]))  {
            displayMessage(`Unable to execute '${e.target.name}'`);
            return console.error(`Unable to execute '${e.target.name}'`);
        } 
        return e.target.name === 'update'
            ? window[e.target.name](JSON.stringify(templateData.data))
            : window[e.target.name]();
    }

    // Displays or hides the .dev-widget-data-con
    function toggleEditTempateData() {
        const devWidget = document.querySelector('.dev-widget');
        // If the widget is NOT in full screen mode, show the .dev-widget-data-con
        if(!devWidget.classList.contains('dev-widget-display-full-screen')) {
            const form = document.querySelector('.dev-widget-data-con form'),
                textarea = document.querySelector('.dev-widget-data-con textarea');
            if(userPrefs.displayTemplateAsGui) {
                form.innerHTML = '';
                // If there is no other data from other templates, hide the import div
                if(!document.querySelector('.dev-widget-other-data').childNodes.length) 
                    modifyAttrValues('.dev-widget-data-header div', {
                        type: 'style', attr: 'display', value: 'none'
                    });
                // If there is no tempalte data, create a baseline to start from
                if(!Object.keys(templateData).length) {
                    form.append(createNewDataObject('text'));
                    form.querySelector('select').value = 'text';
                // Encode the data to the DOM
                } else {
                    document.querySelector('.dev-widget-template-data-name').value = templateData.name;
                    encodeDataToElements(templateData.data, form);
                }
                form.style.display = 'block';
                textarea.style.display = 'none';
            } else {
                form.style.display = 'none';
                textarea.style.display = 'block';
                textarea.textContent = JSON.stringify(templateData.data, undefined, 4);
                document.querySelector('.dev-widget-convert').textContent = 'Convert to GUI View';
            }
            document.querySelector('.dev-widget-update-data-con').style.display = 'flex';
            return toggleWidgetFullScreen(true);
        // Hide the .dev-widget-data-con
        } else {
            document.querySelector('.dev-widget-update-data-con').style.display = 'none';
            return toggleWidgetFullScreen(false);
        }
    }

    // Decodes the template data from the DOM and saves it browser's indexed DB
    function saveTemplateData() {
        try {
            const json = document.querySelector('.dev-widget-data-con form').style.display !== 'none' 
                ? decodeElementstoData()
                : JSON.parse(document.querySelector('.dev-widget-data-con textarea').value);
            if(!json || !Object.keys(json)) return console.error('There was an error encoding the template data');
            const name = document.querySelector('.dev-widget-template-data-name').value;
            // Assemble the update object
            const update = {name, location: window.location.pathname.substring(1).replace(/\//g, '-'), data: json};
            // If the data needs to be updated, add the id
            if(templateData.id) update.id = templateData.id;
            modifyTemplateData(update)
                // Hide the .dev-widget-data-con
                .then(toggleEditTempateData)
                .catch(error => console.error("Something went wrong with saving the tempalte's data", error));
        } catch (error) {
            return console.error('There was an error seting the template data.', error);
        }
    }

    // Imports template data from another template
    function importTemplateData() {
        const select = document.querySelector('.dev-widget-other-data');
        if(!select.childNodes) return console.error('There is no other data to import');
        const location = select.value;
        // Searches for a template data record
        getTemplateData(location)
            .then(result => {
                if(!result) throw new Error('Invalid location query');
                const form = document.querySelector('.dev-widget-data-con form');
                form.innerHTML = '';
                encodeDataToElements(result.data, form);
            })
            .catch(error => {
                return console.error(`${select.childNodes[select.selectedIndex].textContent} (${location}) could not be imported`, error);
            });
    }

    // Converts the GUI data display to a text display and vise versa
    function convertTemplateData() {
        const form = document.querySelector('.dev-widget-data-con form'),
            textarea = document.querySelector('.dev-widget-data-con textarea'),
            button = document.querySelector('.dev-widget-convert');   
        // If the form is showing, convert it to the data to a string and set it to the textarea's value 
        if(form.style.display !== 'none') {
            form.style.display = 'none';
            textarea.style.display = 'block';
            textarea.textContent = JSON.stringify(templateData.data, undefined, 4);
            button.textContent = 'Convert to GUI view';
        // If the form is not showing, attempt to parse the textarea's value to JSON and encode it to DOM Elements
        } else {
            if(textarea.value.trim().length) {
                try {
                    const json = JSON.parse(textarea.value);
                    templateData.data = json;
                    form.style.display = 'block';
                    textarea.style.display = 'none';
                    form.innerHTML = '';
                    return encodeDataToElements(templateData.data, form);
                } catch (error) {
                    const button = document.querySelector('.dev-widget-convert');
                    button.textContent = 'Error parsing JSON. Check Dev Tools.';
                    setTimeout(() => {button.textContent = 'Convert to GUI view'}, 5000);
                    console.error('Unable to parse JSON.', error);
                }
            } else {
                return console.error('No JSON to convert');
            }
        }
    }

    // Checks if the parent element is an array and if so, removes the 'key' input element
    // @param {DOM Node} parent - The parent object to be checked
    // @param {DOM Node} child - The child to may be modified
    function checkforArray(parent, child) {
        if(parent.classList.contains('dev-widget-data-array')) {
            const key = child.querySelector('.dev-widget-data-key');
            if(key) key.remove();
        }
    }

    // Takes an JS object and encodes it to the DOM
    // @param {object} obj - The object to be encoded to DOM elements
    // @param {DOM Node} parent - The parent to apply the new elements to
    function encodeDataToElements(obj, parent) {
        if(!obj) throw new Error('Missing object to encode to DOM');
        if(parent === undefined) parent = document.querySelector('.dev-widget-data-con form');
        return Object.keys(obj).forEach((item, i) => {
            let div;
            if(Array.isArray(obj[item])) {
                div = createNewDataObject('array');
                encodeDataToElements(obj[item], div)
            } else if(typeof obj[item] === 'object') {
                div = createNewDataObject('object');
                encodeDataToElements(obj[item], div)
            } else {
                div = createNewDataObject(typeof obj[item]);
                div.querySelector('.dev-widget-data-value').value = obj[item];
            }
            if(div.querySelector('.dev-widget-data-key'))
                    div.querySelector('.dev-widget-data-key').value = item;
            checkforArray(parent, div);
            parent.append(div);
        })
    }

    // Takes an DOM NOde and decodes it to a JSOn object
    // @returns {object} - The data provided by the DOM element
    function decodeElementstoData() {
        // Get the form holding all the data
        const form = document.querySelector('.dev-widget-data-con form'),
            // Remove any elements that are not our data Nodes
            data = [...form.childNodes].filter(elem => elem.classList.contains('dev-widget-data'));

        // Compresses a DOM Node to a JSON object
        // @param {DOM Node} data - The parent DOM Node who's children hold the data
        // @param {object || array} startVal - What type of value we should start with
        function compressData(data, startVal) {
            return data.reduce((acc, item, i) => {
                const children = [...item.childNodes];
                let key = children.find(i => i.classList.contains('dev-widget-data-key'));
                if(key === undefined) {
                    key = i;
                } else {
                    key = key.value;
                }
                // If it is an object type, compress it further as an object
                if(item.dataset.type === 'object') {
                    const childData = children.filter(i => i.classList.contains('dev-widget-data'));
                    acc[key] = compressData(childData, {});
                // If it is an array type, compress it further as an object
                } else if(item.dataset.type === 'array') {
                    const childData = children.filter(i => i.classList.contains('dev-widget-data'));
                    acc[key] = compressData(childData, []);
                // If it is an string, number, or boolean type, convert and add it to the data set (acc)
                } else {
                    const type = item.dataset.type;
                    let value = children.find(i => i.classList.contains('dev-widget-data-value')).value;
                    switch(type) {
                        case 'number':
                            value = Number(value);
                            break;
                        case 'boolean':
                            value = value.toLowerCase() === 'true' ? true : false;
                            break;
                        case 'text':
                        default:
                            break;
                    }
                    Array.isArray(acc) ? acc.push(value) : acc[key] = value;
                }
                return acc;
            }, startVal);
        }
        // Start compressing as an object
        return compressData(data, {});
    }

    // Creates a new empty DIV element containing the minimum requirements to be tempalte data
    // @param {string} type - The type of JSON element to encode to
    // @returns {DOM Node} - The DIV element that contains the nessecary elements to make up a template data section
    function createNewDataObject(type) {
        const dataElem = document.querySelector('.dev-widget-template-data'),
            div = document.createElement('div'),
            select = document.querySelector('.dev-widget-data-type').cloneNode(true),
            plusIcon = document.querySelector('.dev-widget-add-value .dev-widget-new-item').cloneNode(true),
            key = dataElem.cloneNode(),
            value = dataElem.cloneNode();

        // Add some events to the new elements
        modifyAttrValues(select, {type: 'event', attr: 'change', value: modifyTemplateDataField});
        modifyAttrValues(plusIcon, {type: 'event', attr: 'click', value: modifyTemplateDataField});

        div.classList.add('dev-widget-data');
        div.setAttribute('data-type', type)
        key.classList = 'dev-widget-data-key';
        value.classList = 'dev-widget-data-value';
        div.append(select);
        switch(type) {
            case 'object':
                div.classList.add('dev-widget-data-object');
                select.value = 'object';
                div.append(key, plusIcon);
                break;
            case 'array':
                div.classList.add('dev-widget-data-array');
                select.value = 'array';
                div.append(key, plusIcon);
                break;
            case 'number':
                select.value = 'number';
                value.type = 'number';
                value.value = 0;
                div.append(key, value);
                break;
            case 'boolean': 
                select.value = 'boolean';
                value.type = 'text';
                value.value = true;
                div.append(key, value);
                break;
            case 'text':
            default:
                select.value = 'text';
                value.type = 'text';
                div.append(key, value);
                break;
        }
        return div;
    }

    // Turns a DOM node represneting template data into a new type
    // @param {Event Object} e - The event object to be modified
    function modifyTemplateDataField(e) {
        const elem = e.target;
        let parent = elem.parentElement;
        let child;
        // Find the closest DIV
        if(parent.nodeName !== 'DIV') {
            while(parent.nodeName !== 'DIV') {
                parent = parent.parentElement;
            }
        }
        // Create a new data set using a default type (text) or the previous elements type
        if(!elem.value) {
            const otherChildren = parent.classList.contains('dev-widget-data') 
                ? [...parent.childNodes].filter(elem => elem.classList.contains('dev-widget-data'))
                : null;
            const type = otherChildren !== null && otherChildren.length
                ? otherChildren[otherChildren.length - 1].dataset.type
                : 'text';
            const div = createNewDataObject(type);
            if(!parent.classList.contains('dev-widget-data')) 
                parent = document.querySelector('.dev-widget-data-con form');
            if(parent.style.display === 'none') return;
            parent.append(div);
            child = div;
        // Remove the clicked DOM nodes
        } else if(elem.value === 'remove') {
            const heigherParent = parent.parentElement;
            if(heigherParent.nodeName === 'FORM' 
            && document.querySelectorAll('.dev-widget-data-con form > div').length === 1) {
                elem.value = parent.querySelector('.dev-widget-data-value').type;
                return console.error('There is only one peice of data');
            }
            return heigherParent.removeChild(parent);
        // Update an excisting DOM node
        } else {
            // Create the new DOM element
            const div = createNewDataObject(elem.value);
            const container = parent.parentElement;
            // If the node is changing to an array or object
            if(elem.value === 'object' || elem.value === 'array') {
                child = createNewDataObject('text');
                container.replaceChild(div, parent);
                div.append(child);
                checkforArray(container, div);
                parent = div;
            // If the node is changing to a string, number, or boolean
            } else {
                container.replaceChild(div, parent);
                parent = container;
                child = div;
            }
        }
        // See if we need to remove the 'key' input due to an array parent
        return checkforArray(parent, child);
    }

    // Logs the help message to the console
    function showHelp() {
        displayMessage("Check the Developer's Console (Ctrl + Shft + I)", true);
        return console.log(DEVWIDGET.help);
    }

    // Displays or hides the dev-widget-settings-con
    function toggleEditSettings() {
        const devWidget = document.querySelector('.dev-widget');
        if(!devWidget.classList.contains('dev-widget-display-full-screen')) {
            document.querySelector('.dev-widget-settings-con').style.display = 'flex';
            return toggleWidgetFullScreen(true);
        } else {
            document.querySelector('.dev-widget-settings-con').style.display = 'none';
            return toggleWidgetFullScreen(false);
        }
    }

    // Saves the user's updated preferences to the browser's local storage
    function saveUserPreference(e) {
        const form = document.querySelector('.dev-widget-settings-con form');
        for(let i = 0; i < form.length; i++) {
            // Update the value if it excists
            if(userPrefs[form[i].name] !== undefined) userPrefs[form[i].name] = form[i].checked;
        }
        // Close the settings window
        toggleEditSettings();
        return saveWidgetData({userPrefs});
    }

    /* 
        Helper Funtions ---------------------------------------------------------------------------
    */

    //  Checks for spaces in a value and if they are found, splits and adds each value together
    //  @param {string} value - The string to check for spaces or return as a number
    //  @return {number} - The sum of the value passed in.
    function addStyleValues(value, width, height) {
        if(value.indexOf(' ') !== -1) {
            const values = value.split(' ');
            value = values.reduce((acc, val, index) => {
                if(index % 2 !== 0 && !width) return acc;
                if(index % 2 === 0 && !height) return acc;
                acc = values.length === 2 ? acc + (Number(val)* 2) : acc + Number(val);
                return acc;
            }, 0);
            return value;
        } else {
            return Number(value);
        }
    }


    // Takes an element and returns the computed styles as a total or object of all the values
    // @param {string || DOM node} elem - The elemnt to get the style from
    // @param {string || array} attrs - The attribute/s that need to have their values computed
    // @param {object} direction - The direction to compute. width or height
    // @param {string} operation - The operation to perform on the attribute values
    function getElemComputedStyles({elem, attrs, direction, ops}) {
        if(!elem || !attrs) throw 'Missing element or attributes for getElemComputedStyles';
        if(typeof elem === 'string') elem = document.querySelector(elem);
        if(!direction) direction = {width: true, height: false};
        const compStyles = window.getComputedStyle(elem);
        try {
            if(Array.isArray(attrs)) {
                return attrs.reduce((acc, prop, i) => {
                    const rawValue = compStyles.getPropertyValue(prop).replace(/px/g, '');
                    const value = addStyleValues(rawValue, direction.width, direction.height);
                    if(isNaN(value)) throw new Error(`${prop} could not be used`);
                    const operation = Array.isArray(ops) && ops[i] 
                        ? ops[i] : ops; 
                    switch(operation) {
                        case 'add': 
                        default:
                            acc.total += value;
                            break;
                        case 'subtract':
                            acc.total -= value;
                            break;
                        case 'multiple':
                            acc.total *= value;
                            break;
                        case 'divide': 
                            acc.total /= value;
                            break;
                        case 'all':
                            acc[prop] = value
                            break;
                    }
                    return acc;
                }, {total: 0});
            } else {
                return addStyleValues(compStyles.getPropertyValue(attrs).replace(/px/g, ''), direction.width, direction.height);
            }
        } catch (error) {
            return console.error(error);
        }
    }

    // Convert positions array into integers
    // @param {array} positions - An array of positions to be converted
    // @returns {array} A converted array of numbers to be used for the top and left positions
    function convertPositions(positions) {
        if(!positions) throw new Error('Error with position input. ' + positions);
        return positions.reduce((acc, item, i) => {
            // Check for REM, EM, or PX
            if(isNaN(item)) {
                item = item.toLowerCase();
                // Is a REM. EM, or PX value
                if(item.indexOf('em') > 0 || item.indexOf('px') > 0) {
                    acc[Object.keys(acc)[i]] = convertNumberValue(item);
                } else {
                //Keyword Check - Options: Top, Center, Bottom, Left, Right
                    switch(item) {
                        case 'top':
                        case 'left':
                            break;
                        case 'center':
                            acc[Object.keys(acc)[i]] = i === 0 
                                ? window.innerHeight / 2 - devData.widget.totalHeight / 2 
                                : window.innerWidth / 2 - devData.widget.totalWidth / 2;
                            break;
                        case 'bottom':
                            acc.top = window.innerHeight - devData.widget.totalHeight;
                            break
                        case 'right':
                            acc.left = window.innerWidth - devData.widget.totalWidth;
                            break;
                        default: 
                            throw `"${item}" is not a valid position or keyword`;
                    }
                }
            } else {
                acc[Object.keys(acc)[i]] = item;
            }
            acc[Object.keys(acc)[i]] = Math.ceil(acc[Object.keys(acc)[i]]);
            if(acc[Object.keys(acc)[i]] < 0) acc[Object.keys(acc)[i]] = 0;
            if(Object.keys(acc)[i] === 'top') {
                if(acc.top > window.innerHeight - (devData.widget.height + devData.widget.margin * 4)) 
                    acc.top = window.innerHeight -(devData.widget.height + devData.widget.margin * 4);
            } else {
                if(acc.left > window.innerWidth - (devData.widget.width + devData.widget.margin * 4))
                    acc.left = window.innerWidth - (devData.widget.width + devData.widget.margin * 4);

            }
            return acc;
        }, {top: 50, left: 50});
    }

    // Compares two objects and returns a new update object
    // @param {object} obj1 - The new object
    // @param {obejct} obj2 - The old object to be updated
    // @returns {object} The updated object
    const compareObjects = (obj1, obj2) => {
        if(!obj1 && !Object.keys(obj1).length) return false;
        if(!obj2) obj2 = {};
        // Loop through each item in the new object
        return Object.keys(obj1).reduce((acc, key) => {
            // If the item is a string
            if(typeof obj1[key] !== 'object' && !Array.isArray(obj1[key])) {
                // If the item is not null and does not equal the old object
                if(obj1[key] !== null && obj1[key] !== obj2[key]) {
                    acc[key] = obj1[key];
                // If it is null, remove it
                } else if(obj1[key] === null) {
                    delete acc[key];
                }
            // If the item is an array
            } else if(Array.isArray(obj1[key])) {
                acc[key] = obj1[key];
            // If the item is an object
            } else if(typeof obj1[key] === 'object') {
                // Create or get the sub object to be compared to
                const hasSubObject = obj2[key] ? obj2[key] : {};
                // Compare the sub objects
                acc[key] = compareObjects(obj1[key], hasSubObject);
            }
            return acc;
        // Start with the old object
        }, obj2);
    }

    // Add or removes a style, class, event listener, or attribute from an element
    // @param {object[] || string[] || string} elems - An array of DOM elements or quesry selectors
    // @param {string} type - The type of attribute being modified. Style, Class, Event, or DOM Attribute
    // @param {boolean} flag - Used to remove attributes
    // @param {boolean} all - Whether to select all the elmenets when an array of string is passed in elems
    // @param {string} attr - The attribute to be added to the element
    // @param {string || function} value - The string or function to set as the attribute value
    function modifyAttrValues(elems, {type, flag, all, attr, value}) {
        if(!Array.isArray(elems)) elems = [elems];
        try {
            elems = elems.reduce((acc, elem) => {
                typeof elem === 'string' 
                    ? all 
                        ? acc.push(...document.querySelectorAll(elem)) 
                        : acc.push(document.querySelector(elem))
                    : acc.push(elem);
                return acc;
            }, []);
            elems.forEach((elem, index) => {
                if(typeof elem === 'string') elem = document.querySelector(elem);
                switch(type) {
                    case undefined:
                    case 'attribute':
                    case 'attr':
                        elem.setAttribute(attr, value);
                        break;
                    case 'class':
                        attr 
                            ? elem.classList.add(value) 
                            :  elem.classList.remove(value);
                        break;
                    case 'style':
                        elem.style[attr] = value;
                        break;
                    case 'event':
                        flag || flag === undefined
                            ? elem.addEventListener(attr, value)
                            : elem.removeEventListener(attr, value);
                        break;
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Adjusts colors based on a variabty of options
    // @param {string} color - The color to be adjusted
    // @param {object} A deconstructed option that provides options for adusting color
    // @returns {string} The rgba or hex value requested to be adjusted
    function adjustColor(color, {opacity, invert, type}) {
        // Color is a HEX value
        if(color[0] === '#') {
            color = color.slice(1);
            if(color.length === 3) {
                color = [color[0] + color[0], color[1] + color[1], color[2] + color[2]];
            } else if(color.length === 6) {
                color = [color[0] + color[1], color[2] + color[3], color[4] + color[5]];
            } else {
                console.error('A HEX value requires atleast 3 characters. Example: #fff or #ffffff');
                return false;
            }
            color = color.map(c => {return parseInt(c, 16)});
            color.push(1);
        // Color is an RGB value
        } else if(color.includes('rgb')) {
            color = color.includes('rgba') ? color.slice(4) : color.slice(3);
            color = color.replace(/[\(\)]/g, '');
            color = color.split(',');
            if(color.length < 3) {
                console.error('An RGB value requires atleast 3 value. Example: 255, 255, 255');
                return false;
            }
            if(color.length === 3) color.push(1);
        } else if(color.includes(',')) {
            color = color.split(',').map(c => c.trim());
            if(color.length < 3) {
                console.error('An RGB value requires atleast 3 value. Example: 255, 255, 255');
                return false;
            }
            if(color.length === 3) color.push(1);
        } else {
            console.error('Adjusting the Color requires a valid HEX, RGB, or RGBA value', 
                'Example: HEX: #FFF or #FFFFFF RGB: 255, 255, 255 RGBA 255, 255, 255, .5');
            return false;
        }
        // Convert all strings to numbers
        color = color.map(c => typeof c === 'string' ? Number(c) : c);
        // Check and set opacity
        if(!isNaN(opacity) && Math.sign(opacity) && opacity <= 1) color[3] = Number(opacity);
        // Check and check invert
        if(invert) color = color.reduce((acc, c, i) => {
            i === 3 ? acc.push(c) : acc.push(255-c);
            return acc;
        }, []);
        // Check if a HEX type was requested back, if not return RGBA
        if(typeof type === 'string' && type.toLowerCase() === 'hex') {
            return `#${((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1)}`;
        } else {
            return `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
        }
    }

    // Converts a number value to a px value of type number
    // @param {string} val - The value to be converted
    // @return {number} A value that has been converted to a relative pixel value
    function convertNumberValue(val) {
        if(val.includes('rem')) {
            const num = Number(val.substring(0, val.indexOf('rem')));
            if(isNaN(num)) throw new Error(`Cannot convert rem value: ${val}`);
            return num * parseInt(getComputedStyle(
                document.querySelector('.dev-widget')
            ).fontSize);
        } else if(val.includes('em')) {
            const num = val.substring(0, val.indexOf('em'));
            if(isNaN(num)) throw new Error(`Cannot convert em value: ${val}`);
            return num * parseInt(getComputedStyle(
                document.querySelector('html')
            ).fontSize);
        } else if(val.includes('px')) {
            const num = val.substring(0, val.indexOf('em'));
            if(isNaN(num)) throw new Error(`Cannot convert px value: ${val}`);
            return num;
        } else if(isNaN(Number(val))) {
            return Number(val);
        } else {
            throw new Error(`Invalid value: ${val}`);
        }
    }

    // Opens a connection to the browser's indexedDB
    function opendDBConnection() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB.DB_NAME, DB.DB_VERSION);
            req.onsuccess = function(e) {
                // Update the widgets DB object
                DB.db = this.result;
                return resolve();
            };
            req.onerror = function(error) {
                return reject('Opening DB error: ' + error.target.errorCode)
            };
            req.onupgradeneeded = function(event) {
                DB.db = event.target.result;
                const store = DB.db.createObjectStore(DB.DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
                store.createIndex('name', 'name', {unique: false});
                store.createIndex('location', 'location', {unique: true});
                store.transaction.oncomplete = function(event) {
                    return resolve();
                }
            }
        });
    }


    // Gets an object store form indexedDB
    // @param {string} store_name - The name of the table to get
    // @param {string} mode - The mode to execute the transation in.
    function getObjectStore(store_name, mode) {
        const tx = DB.db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    // Searches an index for a matching record
    // @param {object} store - The IDBObjectStore object
    // @param {string} index_name - The name of the index to query
    // @param {string} search - The string to search for
    function searchIndex(store, index_name, search) {
        const index = store.index(index_name); 
        const req = search !== null ? index.get(search) : index.getAll();
        return req;
    }

    // Gets the data for a tempalte from the broswer's Indexed DB using a location string
    // @param {string} location - The location id to be used when looking for the template data
    // @returns {Promise} - Resolves when the data is recieved
    function getTemplateData(location) {
        return new Promise((resolve, reject) => {
            const store = getObjectStore(DB.DB_STORE_NAME, 'readonly');

            const req = searchIndex(store, 'location', location);
            req.onsuccess = function(e) {
                if(!e.target.result) {
                    console.warn('No template data stored for ' + window.location.pathname);
                } 
                return resolve(e.target.result);
            };

            req.onerror = function(error) {
                return reject('Error getting template data: ' + this.error);
            }
        });
    }

    // Updates the tempalte dat in the browser's indexed DB
    // @param {object} data - The data to be updated or saved
    function modifyTemplateData(data) {
        return new Promise((resolve, reject) => {
            const store = getObjectStore(DB.DB_STORE_NAME, 'readwrite');
            if(templateData.id) {
                const req = store.get(data.id);
                req.onsuccess = function(event) {
                    event.target.result.data = data.data;
                    event.target.result.name = data.name;
                    const reqUpd = store.put(event.target.result);
                    reqUpd.onerror = function(error) {
                        return reject("modfiyTemplateData: " + event.target.errorCode);
                    }
                    reqUpd.onsuccess = function(e) {
                        templateData = data;
                        return resolve();
                    }
                };
                req.onerror = function (evt) {
                    return reject("clearObjectStore: " + evt.target.errorCode)
                };
            } else {
                const req = store.add(data);
                req.onerror = function(error) {
                    return reject("modfiyTemplateData: " + evt.target.errorCode);
                }
                req.onsuccess = function(e) {
                    templateData = data;
                    return resolve();
                }
            }
        });
    }

    // Sets the widget to full screen mode
    // @param {boolean} bool - If the widget should be put into full screen mode or not
    function toggleWidgetFullScreen(bool) {
        const devWidget = document.querySelector('.dev-widget');
        if(bool) {
            devWidget.style.top = 0;
            devWidget.style.left = 0;
            devWidget.classList.add('dev-widget-display-full-screen');
        } else {
            devWidget.classList.remove('dev-widget-display-full-screen');
            if(devData.position) {
                updateWidgetPosition(devData.position);
            }
            
        }
        return true;
    }

    // Displays a message below the widget if the user has 'display messages' turned on
    // @param {string} message - The message to be displayed
    // @param {boolean} force - To force display the message to the user
    function displayMessage(message, force) {
        const displayMessage = document.querySelector('.dev-widget-display-message');
        if(userPrefs.displayUpdates || force) {
            displayMessage.classList.add('dev-widget-slide-down');
            displayMessage.querySelector('p').textContent = message;
            setTimeout(() => {
                displayMessage.classList.remove('dev-widget-slide-down');
            }, 5000);
        }
    }


    /*  The widgets raw HTML
        You can find a formatted version in the dependencies folder.
    */

    function getRAWHTML() {
        return `
<!-- CasparCG HTML Tempalte Developer Widget -->
<!-- Most text values for buttons are set with ::after-->
<div class="dev-widget dev-widget-display-open dev-widget-display-visible">
    <div class="dev-widget-widget">
        <!-- Visibility Controls -->
        <div class="dev-widget-visibility">
            <button class="dev-widget-hide" name="hide"></button>
            <button class="dev-widget-shrink" name="shrink"></button>
            <button class="dev-widget-invis" name="visible"></button>
        </div>
        <!-- Template Options -->
        <div class="dev-widget-options">
            <div class="dev-widget-position-con">
                <button type="button">Drag Me</button>
                <input type="text" class="dev-widget-position" placeholder="Top, Bottom, Right, Left"/>
            </div>
            <input class="dev-widget-background-color" type="text" placeholder="Set Bkg Color as HEX, RGB, or URL"/>
            <div class="dev-widget-custom-command-con">
                <input class="dev-widget-custom-command" type="text" placeholder="Custom Command"/>
                <button class="dev-widget-custom-command-button" type="button" name="customCommand">Run</button>
            </div>
        </div>
        <!-- Playout Controls -->
        <div class="dev-widget-controls dev-widget-standard">
            <button class="dev-widget-play dev-widget-control" name="play"></button>
            <button class="dev-widget-next dev-widget-control" name="next"></button>
            <button class="dev-widget-stop dev-widget-control" name="stop"></button>
        </div>
        <div class="dev-widget-controls dev-widget-data">
            <button class="dev-widget-update" name="update"></button>
            <button class="dev-widget-update-data"></button>
        </div>
        <div class="dev-widget-info">
            <a target="_blank" href="https://github.com/zgav481/CasparCG_HTML_Widget/tree/chris">GitHub</a>
            <button class="dev-widget-help">Help</button>
            <button class="dev-widget-settings">Settings</button>
        </div>
    </div>
    <!-- Update Container -->
    <div class="dev-widget-update-data-con">
        <div class="dev-widget-data-header">
            <h2>Update Template Data</h2>
            <div>
                <select class="dev-widget-other-data"></select>
                <button type="button">Import</button>
            </div>
        </div>
        <div class="dev-widget-data-con">
            <!-- Elements to duplicate and use within the data container -->
            <div class="dev-widget-hidden-elements">
                <input class="dev-widget-template-data" type="text"/>
                <select class="dev-widget-data-type" value="text">
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="remove">Remove</option>
                </select>
            </div>
            <input class="dev-widget-template-data-name" type="text" placeholder="Enter Template Name"/>
            <form></form>
            <textarea></textarea>
            <div class="dev-widget-add-value">
                <button class="dev-widget-convert" type="button">Convert to raw JSON</button>
                <button class="dev-widget-new-item" type="button">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="1.25em">
                        <circle cx="50%" cy="50%" r="45%" fill="none", stroke="white" stroke-width="6px"/>
                        <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="white" stroke-width="4px" stroke-linecap="round"/>
                        <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="white" stroke-width="4px" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="dev-widget-update-controls">
            <button type="button">Do Not Save</button>
            <button type="button">Update and Save</button>
        </div>
    </div>
    <!-- Widget Settings Container -->
    <div class="dev-widget-settings-con">
        <div>
            <h2>User Settings</h2>
        </div>
        <div>
            <form>
                <label for="dev-widget-run-update-onload">Run update command on page load?</label>
                <input id="dev-widget-run-update-onload" type="checkbox" name="callUpdateOnLoad"/>
                <hr>
                <label for="dev-widget-template-data-display">Display Template Data in GUI view</label>
                <input id="dev-widget-template-data-display" type="checkbox" name="displayTemplateAsGui"/>
                <label for="dev-widget-display-message">Display updates below widget?</label>
                <input id="dev-widget-display-message" type="checkbox" name="displayUpdates"/>
            </form>
        </div>
        <div class="dev-widget-update-prefs-controls">
            <button type="button">Do Not Save</button>
            <button type="button">Update and Save</button>
        </div>
    </div>
    <div class="dev-widget-display-message">
        <p></p>
    </div>
</div>
`
    }

    /*  The widgets raw CSS
        You can find a formatted version in the dependencies folder.
    */

    function getRAWCSS() {
        return `
<style>
/* Font from Google to clean up the text */
@import url("https://fonts.googleapis.com/css?family=Catamaran:300&display=swap");
/* Main div element */
.dev-widget {
  border-radius: 5px;
  position: absolute;
  margin: 1em;
  padding: 0.25em;
  top: 0;
}
.dev-widget a, .dev-widget a:visited {
  text-decoration: none;
  color: white;
}
.dev-widget p {
  margin: 0;
}
.dev-widget input, .dev-widget a {
  border: none;
  font-size: 1.25em;
  margin: 0.1em 0;
  padding: 0 0.25em;
}
.dev-widget textarea {
  display: none;
  min-width: 50vw;
  min-height: 60vh;
  font-size: 1.25em;
  margin: 0.5em 0;
}
.dev-widget button {
  background-color: transparent;
  border: none;
  font-size: 1.25em;
  padding: 0;
  text-align: center;
}
.dev-widget button, .dev-widget option, .dev-widget input, .dev-widget h2, .dev-widget p, .dev-widget select, .dev-widget option, .dev-widget a, .dev-widget label, .dev-widget textarea {
  font-family: "Catamaran", "Arial";
}
.dev-widget .dev-widget-controls button, .dev-widget .dev-widget-update-data-con {
  color: white;
}
.dev-widget .dev-widget-transparent {
  background-color: transparent;
}
.dev-widget .dev-widget-custom-command-con, .dev-widget .dev-widget-position-con {
  display: flex;
}
.dev-widget .dev-widget-custom-command-con button, .dev-widget .dev-widget-position-con button {
  margin: 0 auto;
  padding: 0 0.5em;
  white-space: nowrap;
}
.dev-widget .dev-widget-position-con button {
  padding-left: unset;
}
.dev-widget .dev-widget-settings-con, .dev-widget .dev-widget-update-data-con {
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
}
.dev-widget .dev-widget-update-controls, .dev-widget .dev-widget-update-prefs-controls {
  display: flex;
  justify-content: space-evenly;
}
.dev-widget .dev-widget-update-controls button, .dev-widget .dev-widget-update-prefs-controls button {
  padding: 0 1em;
  border-bottom: 1.5px solid transparent;
  transition-property: border-bottom;
  transition-duration: 0.5s;
}
.dev-widget .dev-widget-update-controls button:hover:first-of-type, .dev-widget .dev-widget-update-prefs-controls button:hover:first-of-type {
  border-bottom: 1.5px solid #EB261F;
}
.dev-widget .dev-widget-update-controls button:hover:last-of-type, .dev-widget .dev-widget-update-prefs-controls button:hover:last-of-type {
  border-bottom: 1.5px solid #1177B7;
}
.dev-widget .dev-widget-update-data-con > div {
  background-color: #202124;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  margin: 0.25em 0;
  padding: 1em;
}
.dev-widget .dev-widget-update-data-con button {
  color: white;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-header > * {
  margin: 0;
  padding: 0 0.25em;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-header select, .dev-widget .dev-widget-update-data-con .dev-widget-data-header option, .dev-widget .dev-widget-update-data-con .dev-widget-data-header button {
  font-size: 1em;
  color: white;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-header select {
  background-color: transparent;
  border: none;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-header option {
  color: black;
  border: none;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-template-data-name {
  border: none;
  border-bottom: 1.5px solid white;
  background-color: transparent;
  color: white;
  display: block;
  margin: 0 0 0 auto;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-hidden-elements {
  display: none;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con form {
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow-y: auto;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data {
  border: 1px solid transparent;
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  grid-column: 1/3 span;
  margin: 0.5em 0.25em;
  padding: 0 0.15em;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data > button {
  display: flex;
  grid-column: 3;
  margin: 0 0 0 auto;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con div.dev-widget-data-object, .dev-widget .dev-widget-update-data-con .dev-widget-data-con div.dev-widget-data-array {
  border: 1px solid #1177B7;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-message {
  grid-column: span 2;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data-type {
  background-color: transparent;
  border: none;
  color: white;
  grid-column: 1;
  height: 3em;
  width: min-content;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data-type option {
  background-color: #202124;
  white-space: nowrap;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con input.dev-widget-data-key, .dev-widget .dev-widget-update-data-con .dev-widget-data-con input.dev-widget-data-array {
  grid-column: 2;
  margin-right: 0.25em;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con input.dev-widget-data-value {
  grid-column: 3;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data-array > input, .dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-data-object > input {
  width: 150%;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-add-value {
  display: flex;
  border-top: 1.5px solid white;
  margin-top: 0.5em;
  justify-content: space-between;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-add-value button {
  margin: 0 auto;
  padding-top: 0.25em;
}
.dev-widget .dev-widget-update-data-con .dev-widget-data-con .dev-widget-add-value .dev-widget-new-item {
  flex: 2;
}
.dev-widget .dev-widget-settings-con {
  color: white;
  font-size: 1.25em;
}
.dev-widget .dev-widget-settings-con > div {
  background-color: #202124;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  margin: 0.25em 0;
  padding: 1em;
}
.dev-widget .dev-widget-settings-con div label {
  padding: 0 0.5em;
}
.dev-widget .dev-widget-settings-con div input[type=checkbox] {
  height: 1em;
  width: 1em;
}
.dev-widget .dev-widget-settings-con h2 {
  margin: 0;
}
.dev-widget .dev-widget-settings-con form {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr min-content;
}
.dev-widget .dev-widget-settings-con form hr {
  grid-column: span 2;
  width: 100%;
}
.dev-widget .dev-widget-display-message {
  bottom: 0;
  opacity: 0;
  transition-property: bottom, opacity;
  transition-duration: 1s, 1s;
  text-align: center;
  z-index: -1;
}
.dev-widget .dev-widget-slide-down {
  bottom: -2em;
  opacity: 1;
}

.dev-widget-display-visible .dev-widget-widget .dev-widget-play {
  background-color: #29AF1D;
}
.dev-widget-display-visible .dev-widget-widget .dev-widget-next {
  background-color: #F7B92B;
}
.dev-widget-display-visible .dev-widget-widget .dev-widget-stop {
  background-color: #EB261F;
}
.dev-widget-display-visible .dev-widget-widget .dev-widget-data button {
  background-color: #1177B7;
}

.dev-widget-display-invisible .dev-widget-controls button {
  background: transparent;
}

.dev-widget-display-open {
  display: flex;
  background-color: #202124;
}
.dev-widget-display-open button {
  color: white;
}
.dev-widget-display-open .dev-widget-hide:after {
  content: "Hide";
}
.dev-widget-display-open .dev-widget-shrink:after {
  content: "Shrink";
}
.dev-widget-display-open .dev-widget-invis:after {
  content: "Invis";
}
.dev-widget-display-open .dev-widget-controls, .dev-widget-display-open .dev-widget-visibility, .dev-widget-display-open .dev-widget-info {
  display: flex;
  justify-content: space-around;
}
.dev-widget-display-open .dev-widget-controls button {
  border-radius: 25px;
  margin: 0.1em;
  padding: 0 0.5em;
}
.dev-widget-display-open .dev-widget-controls.dev-widget-standard button {
  font-size: 2em;
}
.dev-widget-display-open .dev-widget-controls.dev-widget-standard button:nth-of-type(1):after {
  content: "Play";
}
.dev-widget-display-open .dev-widget-controls.dev-widget-standard button:nth-of-type(2):after {
  content: "Next";
}
.dev-widget-display-open .dev-widget-controls.dev-widget-standard button:nth-of-type(3):after {
  content: "Stop";
}
.dev-widget-display-open .dev-widget-controls.dev-widget-data button {
  font-size: 1.5em;
}
.dev-widget-display-open .dev-widget-controls.dev-widget-data button:nth-of-type(1):after {
  content: "Update";
}
.dev-widget-display-open .dev-widget-controls.dev-widget-data button:nth-of-type(2):after {
  content: "Update Data";
}
.dev-widget-display-open .dev-widget-options {
  display: flex;
  flex-direction: column;
}
.dev-widget-display-open .dev-widget-options input {
  border-bottom: 2px solid transparent;
}
.dev-widget-display-open .dev-widget-display-message {
  position: absolute;
  width: 100%;
}

/* Defines the element when hidden */
.dev-widget-display-hide .dev-widget-widget, .dev-widget-display-hide .dev-widget-visibility {
  display: flex;
}
.dev-widget-display-hide .dev-widget-visibility {
  margin: 1em;
}
.dev-widget-display-hide .dev-widget-hide:after {
  content: "H";
}
.dev-widget-display-hide .dev-widget-shrink:after {
  content: unset;
}
.dev-widget-display-hide .dev-widget-controls, .dev-widget-display-hide .dev-widget-options, .dev-widget-display-hide .dev-widget-info, .dev-widget-display-hide .dev-widget-display-message {
  display: none;
}

/* Defines the element when shrunken */
.dev-widget-display-shrink {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dev-widget-display-shrink .dev-widget-hide:after {
  content: "H";
}
.dev-widget-display-shrink .dev-widget-shrink:after {
  content: "S";
}
.dev-widget-display-shrink .dev-widget-invis:after {
  content: "I";
}
.dev-widget-display-shrink .dev-widget-options, .dev-widget-display-shrink .dev-widget-info, .dev-widget-display-shrink .dev-widget-display-message {
  display: none;
}
.dev-widget-display-shrink .dev-widget-controls, .dev-widget-display-shrink .dev-widget-visibility {
  display: flex;
  flex-direction: column;
}
.dev-widget-display-shrink .dev-widget-controls button {
  font-size: 1em;
  border-radius: 25px;
  margin: 0.1em;
  padding: 0 0.5em;
}
.dev-widget-display-shrink .dev-widget-controls.dev-widget-standard button:nth-of-type(1):after {
  content: "P";
}
.dev-widget-display-shrink .dev-widget-controls.dev-widget-standard button:nth-of-type(2):after {
  content: "N";
}
.dev-widget-display-shrink .dev-widget-controls.dev-widget-standard button:nth-of-type(3):after {
  content: "S";
}
.dev-widget-display-shrink .dev-widget-controls.dev-widget-data button:nth-of-type(1):after {
  content: "U";
}
.dev-widget-display-shrink .dev-widget-controls.dev-widget-data button:nth-of-type(2):after {
  content: "UD";
}

.dev-widget-display-full-screen {
  align-items: center;
  border-radius: 0;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
.dev-widget-display-full-screen .dev-widget-widget {
  filter: blur(2px);
}
</style>
`
    }

    /*  Initializes the widget.
        Order of opperations
        Check ENV -> Load HTML and CSS -> Try to get local storage data -> update any values returned
    */
    initializeDevEnv();

    return {
        /*  Widget API
            Allows the dev to interact with the widget with code or the console.
        */
       
        // Returns the top and left positions
        getWidgetPosition: function() {return devData.position},
        // Set Widget position
        setWidgetPosition: function(position) {
            if(typeof position === 'undefined') return console.log(
`DEVWIDGET.setWidgetPosition(position)
Moves the widget to a position on the screen.
    @param {string || string[]} position - A string or array with the new position of the widget. 
        It can be px, em, rem or keywords like top, bottom, center, left, and or right.
Example (Copy): DEVWIDGET.setWidgetPosition(['top', 'right'])`
            )
            return updateWidgetPosition(position);
        },
        // Returns the background color as an rgba value
        getBackgroundColor: function(asHEX) {
            if(asHEX) return devData.backgroundColor;
            return adjustColor(devData.backgroundColor, {type: 'rgb'});
        },
        // Sets the background color
        // @param {string} color - A HEX, RGB, or RGBA value that will be used to set the background color.
        setBackgroundColor: function(color) {
            if(typeof color === 'undefined') return console.log(
`DEVWIDGET.setBackgroundcolor(color)
Sets the color of the body element.
    @param {string} color - The HEX, RGB, or RGBA value. 
        EX: #123 or #131123 or 0,0,0 or 0,0,0,1 or rgb(0,0,0) or rgba(0,0,0,.5)
Example (Copy): DEVWIDGET.setBackgroundColor('#123')`
            );
            return updateBackgroundColor(color);
        },

        // Returns the custom command
        getCustomCommand: function() {return devData.customCommand},
        // Sets the custom command
        setCustomCommand: function(command) {
            if(!command) return console.log(
`DEVWIDGET.setCustomCommand(command)
Sets the custom command the widget will run.
    @param {string} command - The command to be set
Example (Copy): DEVWIDGET.setCustomCommand('reset')`
            );
            return updateCustomCommand(command)
        },
        // Attempts to run the custom command
        runCustomCommand: function() {
            return runPlayoutCommand({target: {name: 'customCommand'}});
        },

        // Displays or closes the update template data window
        toggleEditTempateData,
        // Gets the tempalte data and retuns it as a string
        getWidgetTemplateData: () => {return JSON.stringify(templateData.data)},
        // Toggles if the widget should be in a dragging state
        toggleDragWidget: function(bool) {
            if(typeof bool === 'undefined') return console.log(
`DEVWIDGET.setDragWidget(onOfOff)
Turns on or off the widgets dragging state
    @param {boolean} onOfOff - A true or false value for dragging the widget
Example (Copy): DEVWIDGET.toggleDragWidget(true)`
            );
            if(bool) {
                return toggleDragWidget({type: 'mousedown'});
            } else {
                dragging = true;
                return toggleDragWidget({type: 'mouseup'});
            }
        },
        // Gets the widgets data and retuns it as a string
        getWidgetData: () => {return JSON.stringify(devData)},
        // Sets the Widgets Data
        setWidgetData: (raw) => {
            if(typeof raw === 'undefined') return console.log( 
`DEVWIDGET.setWidgetData(raw)
Pass a JSON onject as a string to set the widgets data.
    @param {string} raw - The JSON object as a string
Example (Copy): DEVWIDGET.setWidgetData('{"position":[200,200]}');
`);
            try {
                const json = JSON.parse(raw);
                saveWidgetData(json);
                return 'Widget data set, refresh to apply changes.';
            } catch (error) {
                console.error('Error parsing or setting JSON.', error);
                return null;
            }
        },
        /*

        */
        help: 
`We are here to help!
Here are all the commands you can use with the dev widget.
Run the set functions without parameters to get the help. Example (Copy): DEVWIDGET.setBackgroundColor()

DEVWIDGET.getBackgroundColor()
DEVWIDGET.setBackgroundColor()
DEVWIDGET.getCustomCommand()
DEVWIDGET.setCustomCommand()
DEVWIDGET.runCustomCommand()
DEVWIDGET.getWidgetPosition()
DEVWIDGET.setWidgetPosition()
DEVWIDGET.toggleDragWidget()
DEVWIDGET.toggleEditTempateData()
DEVWIDGET.getWidgetTemplateData()
DEVWIDGET.getWidgetData()
DEVWIDGET.setWidgetData()`
    }
}());
