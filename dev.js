'use strict';

/*
    CasparCG Developer Widget
    Originally Created By Christopher Ouellette
    Please feel free to suggest add ons, re-work the entire widget or, anything in between!
    Got a cool addition, please reach out!
*/

// Global variable that acts as API
const DEVWIDGET = (function() {
    let localENV = 'PROD',
        initialized = false,
        displayUpdates = false,
        devData = {
            positions: {
                top: 0,
                bottom: 0
            }
        };

    let dragging = false;

    // Check for and load HTML and CSS
    function initializeRawHTML() {
        return new Promise((resolve, reject) => {
            const checkDOM = () => {
                const val = window.getComputedStyle(document.querySelector('.dev-widget')).getPropertyValue('height');
                if(val.includes('auto') || val.replace('px', '') < 250) {
                    window.requestAnimationFrame(checkDOM); 
                } else {
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

                localENV = 'DEV';

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
            addAttrValues([
                {
                    elem: '.dev-widget-visibility button',
                    all: true,
                    event: true,
                    defualt: false,
                    attr: 'click',
                    value: updateDisplay
                }, {
                    elem: ['.dev-widget-control', '.dev-widget-update', '.dev-widget-custom-command-button'],
                    all: [true, false],
                    event: true,
                    defualt: false,
                    attr: 'click',
                    value: runPlayoutCommand
                },{
                    elem: '.dev-widget-position',
                    event: true,
                    defualt: false,
                    attr: 'blur',
                    value: updateWidgetPosition
                }, {
                    elem: '.dev-widget-background-color',
                    event: true,
                    defualt: false,
                    attr: 'blur',
                    value: updateBackgroundColor
                } , {
                    elem: '.dev-widget-custom-command',
                    event: true,
                    defualt: false,
                    attr: 'blur',
                    value: updateCustomCommand
                }, {
                    elem: ['.dev-widget-visibility button','.dev-widget-position-con button'],
                    event: true,
                    all: [true, false],
                    defualt: false,
                    attr: 'mousedown',
                    value: toggleDragWidget
                }, {
                    elem: '.dev-widget-widget',
                    event: true,
                    all: true,
                    defualt: false,
                    attr: 'mouseup',
                    value: toggleDragWidget
                }
            ]);
        } catch (error) {
            return console.error(`Error attaching event listeners to widget. ${error.message}`);
        }
    }

    //Checks to make sure that all the required playout functions are defined
    function initializePlayoutFunction() {
        const commands = ['update', 'play', 'next', 'stop'];
        try {
            const missing = commands.filter(item => {
                if(typeof window[item] !== 'function' 
                || (/\{\s*\[native code\]\s*\}/).test('' + window[item])) return true;
                return false;
            });
            if(missing.length) throw new Error(missing.join(', '));
        } catch (error) {
            console.error(`Template is missing required playout commands: ${error.message}`)
        }
    }



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
        // Check the global scope for the required playout commands. update, play, next, stop
        initializePlayoutFunction();
        

        // Attempt to load data from the local storage
        try {
            if(!localStorage.length) throw new Error();
            devData = JSON.parse(localStorage.getItem('devWidget'));
            if(!Object.keys(devData).length) throw new Error({message: 'Dev Data storaged in local storage has no keys'}); 
        } catch(e) {
            devData = {};
            if(Object.keys(e).length) return console.log('Error finding Dev Data', e);
            initialized = true;
            return console.warn(`
Welcome to CasparCG HTML Developer Widget.
To begin, simply click a playout command, enter a custom command, or set a background color using a HEX, RGB, or RGBA value.
The position input can work with or without commas, a space is required at minimum.`
            );
        }
        
        try {
            // Call all the function there is data for
            updateBackgroundColor(devData.backgroundColor);
            updateDisplay(devData.display);
            updateWidgetPosition(devData.position);
            updateCustomCommand(devData.customCommand);
        } catch (error) {
            return console.error('An error occured when setting the rempaltes data. ' + error);
        }
        initialized = true;
    }

    // Initialize the Widget
    initializeDevEnv();




    // Compares the update sent and current data and saves it to local storage
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
        if(e.target) e = e.target.name;
        const devWidget = document.querySelector('.dev-widget'),
            classList = devWidget.classList;

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
        if(e.includes('open')) {
            // Show the widget
            if(classList.contains('dev-widget-display-hide')) {
                if(!classList.contains('dev-widget-display-invisible')) {
                    classList.add('dev-widget-display-visible');
                }
                classList.remove('dev-widget-display-hide', '.dev-widget-display-shrink');
                classList.add('dev-widget-display-open');
            }
        } 
        if(e.includes('shrink')) {
            if(classList.contains('dev-widget-display-shrink')) {
                classList.remove('dev-widget-display-shrink');
                classList.add('dev-widget-display-open');
            } else {
                classList.add('dev-widget-display-shrink');
                classList.remove('dev-widget-display-open', 'dev-widget-display-hide');
            }
        }
        if(e.includes('visible')) {
            const val = devData.backgroundColor ? devData.backgroundColor : '#fff';
            const invert = adjustColor(val, {invert: true});
            // Show the widget
            if(classList.contains('dev-widget-display-invisible') || !e.includes('visible')) {
                devWidget.style.backgroundColor = invert;
                classList.remove('dev-widget-display-invisible');
                classList.add('dev-widget-display-visible');
                addAttrValues([
                    {elem: '.dev-widget button', all: true, 
                    style: true, defualt: false, attr: 'color', value: val},
                    {elem: '.dev-widget-widget input', all: true, 
                    style: true, defualt: false, attr: 'borderBottom', value: 'none'}
                ]);
            } else {
                devWidget.style.backgroundColor = 'transparent';
                classList.add('dev-widget-display-invisible');
                classList.remove('dev-widget-display-visible');
                addAttrValues([
                    {elem: '.dev-widget-widget button', all: true, 
                    style: true, defualt: false, attr: 'color', value: invert},
                    {elem: '.dev-widget-widget input', all: true, 
                    style: true, defualt: false, attr: 'borderBottom', value: `2px solid ${invert}`}
                ]);
            }
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
        return saveWidgetData({display});
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
    function runPlayoutCommand(e) {
        if(e.target.name === 'customCommand') {
            if(!devData.customCommand) return;
            if(typeof window[devData.customCommand] === 'function') return window[devData.customCommand]();
            return console.error(`Unable to execute ${devData.customCommand}`);
        }
    }




    // Sets the widgets position on the screen. 
    //Can exept Top, Bottom, Right, Left, and or a set of pixel values
    // @param {object} top, right - The positions of the widget
    function updateWidgetPosition(positions) {
        if(!positions) return console.log('No positions passed to update widget position')
;        if(positions.target) positions = positions.target.value;
        try {
            const devWidget = document.querySelector('.dev-widget');
            const input = document.querySelector('.dev-widget-position');

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

            devWidget.style.top = convertedPostions.top + 'px';
            devWidget.style.left = convertedPostions.left + 'px';

            input.value = `${positions[0]}, ${positions[1]}`;

            devData.widget.positions = convertedPostions; 

            if(!dragging) {
                return saveWidgetData({position: positions});
            }

        } catch (error) {
            let message = typeof error === 'object' ? error.message : error;
            return console.error(`There was an error setting the widgets positions. ${message}`);
        }
    }












    function dragWidget(e) {
        if(dragging) {
            return updateWidgetPosition([e.clientY - 50, e.clientX - 50])
        }
    }

    function toggleDragWidget(e) {
        e.preventDefault();
        if(e.type === 'mousedown') {
            if(document.querySelector('.dev-widget').classList.contains('dev-widget-display-open')
            && e.target.parentElement.classList.contains('dev-widget-visibility')) return;
            dragging = true;
            document.addEventListener('mousemove', dragWidget);
        } else if(dragging) {
            dragging = false;
            document.removeEventListener('mousemove', dragWidget);
            return saveWidgetData({position: [e.clientY - 50, e.clientX - 100]});
        }
    }









    function updateBackgroundColor(e) {
        if(!e) return console.error('No value supplied for updateBackgroundColor');
        try {
            const rawValue = e.target ? e.target.value : e;
            if(!rawValue) throw new Error('Adjusting the Color requires a valid HEX, RGB, or RGBA value. Example: HEX: #FFF or #FFFFFF RGB: 255, 255, 255 RGBA 255, 255, 255, .5');
            if(rawValue.includes('http')) {
                document.querySelector('body').style.backgroundImage = `url(${val})`;
                return saveDevData({backgroundColor: `url(${val})`});
            }
            // Get the inverted color of the set background color
            const val = adjustColor(rawValue, {});
            const invert = adjustColor(val, {invert: true});
            
            document.querySelector('body').style.backgroundColor = val;
            document.querySelector('body').style.backgroundImage = null;
            document.querySelector('.dev-widget').style.backgroundColor = invert;
            document.querySelector('.dev-widget-background-color').value = rawValue;

            addAttrValues([
                {
                    elem: '.dev-widget-widget div:not(.dev-widget-controls) button',
                    all: true,
                    style: true,
                    attr: 'color',
                    value: val
                }, {
                    elem: '.dev-widget-widget input',
                    all: true,
                    style: true,
                    attr: 'backgroundColor',
                    value: val
                }, {
                    elem: '.dev-widget-widget input',
                    all: true,
                    style: true,
                    attr: 'color',
                    value: invert
                }
            ]);
            return saveWidgetData({backgroundColor: rawValue});
        } catch(error) {
            return console.error(error);
        }
    }


    /* Playout Controls

    */

    function play() {
        console.log('play')
    }

    /* Helper Funtions
        @function addStyleValues - Adds the width, height or both to a value
        @function getElemComputedStyles 
            - Returns the computed styles of an element as a total or object of all the values
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
    function convertPositions(positions) {
        if(!positions) throw new Error('Error with position input. ' + positions);
        // Convert EM to PX
        const convertEmToPx = em => {
            if(typeof em === 'string') em = parseFloat(em);
            if(isNaN(em)) throw new Error('Can not parse em value');
            return em * parseInt(getComputedStyle(devWidget).fontSize)
        },
        // Convert REM to PX
        convertRemToPx = rem => {
            if(typeof rem === 'string') rem = parseFloat(rem);
            if(isNaN(rem)) throw new Error('Can not parse rem value');
            return rem *  parseInt(getComputedStyle(document.querySelector('html')).fontSize)
        }

        return positions.reduce((acc, item, i) => {
            // Check for REM, EM, or PX
            if(isNaN(item)) {
                item = item.toLowerCase();
                // Is a REM value
                if(item.indexOf('rem') > 0) {
                    convertedPostions[Object.keys(convertedPostions)[i]] = 
                        convertRemToPx(item.substring(0, item.indexOf('rem')));
                // Is a EM value
                } else if(item.indexOf('em') > 0) {
                    convertedPostions[Object.keys(convertedPostions)[i]] = 
                        convertEmToPx(item.substring(0, item.indexOf('em')));
                // Is a Pixel value
                } else if(item.indexOf('px') > 0) {
                    convertedPostions[Object.keys(convertedPostions)[i]] = item.substring(0, item.indexOf('px'));
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

    function checkElement(e, all) {
        if(typeof e === 'string') {
            if(all) {
                return [...document.querySelectorAll(e)]
            } else {
                return [document.querySelector(e)];
            }
        } else if(Array.isArray(e)) {
            return e.reduce((acc, item, i) => {
                if(typeof item === 'string') {
                    let checkAll = Array.isArray(all) ? all[i] : all
                    if(checkAll) {
                        acc.push(...document.querySelectorAll(e));
                    } else {
                        acc.push(document.querySelector(e));
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
        } else {
            return [e];
        }
    }

    function addAttrValues(data) {
        const findClosest = (arr, t) => Array.isArray(arr) 
            ? arr.find((item, i) => i >= t) : arr;

        const addAttribute = (e,i,index) => {
            const attr = findClosest(i.attr, index);
            const value = findClosest(i.value, index);
            if(i.event) e.addEventListener(attr, value);
            if(i.class !== undefined) {
                if(i.class) {
                    e.classList.add(value);
                } else {
                    e.classList.remove(value);
                }
            }
            if(i.style) e.style[attr] = value;
            if(i.defualt !== false) e.setAttribute(attr, value);
        }

        if(Array.isArray(data)) {
            try {
                data.forEach((item, i) => {
                    if(item.attr === undefined) throw new Error('Error with item in array: ' + item.attr);
                    item.elem = checkElement(item.elem, item.all);
                    item.elem.forEach((e,i) => {
                        addAttribute(e,item,i)
                    })
                });
            } catch (error) {
                return console.error(error);
            }
        } else if(typeof data === 'object') {
            try {
                if(item.attr === undefined) throw new Error('Error with item in obj: ' + item.attr);
                if(typeof item.elem === 'string') item.elem = document.querySelector(item.elem);
                addAttrValues(item.elem,item,0);
            } catch (error) {
                return console.error(error);
            }
        } else {
            return console.error(`Invalid data element: ${data}`);
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


    /* 

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
                    <button class="dev-widget-invis" name="invis"></button>
                </div>
                <!-- Template Options -->
                <div class="dev-widget-options">
                    <div class="dev-widget-position-con">
                        <input type="text" class="dev-widget-position" placeholder="Top, Bottom, Right, Left"/>
                        <button type="button">Drag Me</button>
                    </div>
                    <input class="dev-widget-background-color" type="text" placeholder="Set Background Color"/>
                    <div class="dev-widget-custom-command-con">
                        <input class="dev-widget-custom-command" type="text" placeholder="Custom Command"/>
                        <button type="button">Run</button>
                    </div>
                </div>
                <!-- Playout Controls -->
                <div class="dev-widget-controls dev-widget-standard">
                    <button class="dev-widget-play dev-widget-control"></button>
                    <button class="dev-widget-next dev-widget-control"></button>
                    <button class="dev-widget-stop dev-widget-control"></button>
                </div>
                <div class="dev-widget-controls dev-widget-data">
                    <button class="dev-widget-update"></button>
                    <button clas="dev-widget-update-data"></button>
                </div>
            </div>
        </div>
`
    }

    function getRAWCSS() {
        return `
<style>

</style>
`
    }

    return {
        /*

        */
        // Returns the top and left positions
        widgetPosition: function() {return devData.position},
        // Set Widget position
        setWidgetPosition: function(position) {
            return updateWidgetPosition(position);
        },
        // Returns the background color as an rgba value
        backgroundColor: function() {return devData.backgroundColor},
        // Sets the background color
        // @param {string} color - A HEX, RGB, or RGBA value that will be used to set the background color.
        setBackgroundColor: function(color) {

        },

        /*

        */
        help: 
        `
We are here to help!
Run .propYouWantHelpWith.helpType for more help with the value or method.
Ex. DEVWIDGET.position.propHelp will tell you about the position value returned.
    DEVWIDGET.position.methodHelp will tell you how to set the widget's position.

The options are
    .backgroundColor
    .widgetBackgroundColor
    .position
`,
        backgroundColor: {
            propHelp: 
`
DEVWIDGET.backgroundcolor(asHEX)
Returns the background color as an RGBA or HEX value
`,
            methodHelp: 
`
DEVWIDGET.setBackgroundcolor(color, {opacity, invert, type})
    Adjusts then sets the color. A null or empty object will just set the background color.
        color - The HEX, RGB, or RGBA value. EX: #123 or #131123 or 0,0,0 or 0,0,0,1 or rgb(0,0,0) or rgba(0,0,0,.5)
        opacity - A percentage or 0 to 1 value.
        invert - Will invert the color.
        type - Forces the color to be a HEX value or RGB value.
`
        },
        position: {
            propHelp:
`
DEVWIDGET.widgetPosition()
Returns an object with top and left positions for the widget.
`,
            methodHelp: 
`
DEVWIDGET.setWidgetPosition(position)
    Moves the widget to a position on the screen.
            position - A string or array with the new position of the widget. 
                It can be px, em, rem or keywords like top, bottom, center, left, and or right.
`
        }
    }
    
}());


// Sets the Background color of the body HTML Element
// @param {object} e - Event oject
const setBackgroundColor = e => {
    const rawValue = e.target ? e.target.value : e;
    const val = adjustColorDev(rawValue, {});
    if(!val) throw new Error('Adjusting the Color requires a valid HEX, RGB, or RGBA value. Example: HEX: #FFF or #FFFFFF RGB: 255, 255, 255 RGBA 255, 255, 255, .5');
    if(val.includes('http')) {
        document.querySelector('body').style.backgroundImage = `url(${val})`;
        return saveDevData({backgroundColor: `url(${val})`});
    }
    try {
        // Get the inverted color of the set background color
        const invert = adjustColorDev(val, {invert: true});
        const buttons = document.querySelectorAll('.dev-controller button:not(.control)'),
            inputs = document.querySelectorAll('.dev-controller input'),
            input = document.querySelector('.dev-controller #dev-bkg-color');
        
        document.querySelector('body').style.backgroundColor = val;
        document.querySelector('body').style.backgroundImage = null;
        document.querySelector('.dev-controller').style.backgroundColor = invert;
        buttons.forEach(elem => {
            elem.style.color = val;
        });
        inputs.forEach((elem) => elem.style.border = `1px solid ${val}`);
        input.value = rawValue;
        return saveDevData({backgroundColor: rawValue});
    } catch(e) {
        console.error(e);
    }
}

// Saves the text entered into the custom command input
const setCustomCommand = e => {
    return saveDevData({customCommand: e.target.value});
}
