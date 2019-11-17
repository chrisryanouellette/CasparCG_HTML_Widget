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
        devData = {};

    let dragging = false;

    function initializeDevEnv() {
        const html = document.querySelector('html');

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
        
        // attempt to load the widget
        try {
            const parser = new DOMParser();
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
        } catch (error) {
            return console.warn(error);
        }

         // Try and add all the event inital listeners for widget
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
                    elem: ['.dev-widget-control', '.dev-widget-update'],
                    all: [true, false],
                    event: true,
                    defualt: false,
                    attr: 'click',
                    value: runPlayoutCommand
                }, {
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
                    elem: ['.dev-widget-visibility button', '.dev-widget-position-con button'],
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
                }, {
                    elem: window,
                    event: true,
                    defualt: false,
                    attr: 'unload',
                    value: () => saveWidgetData(devData)
                }
            ]);
        } catch (error) {
            return console.error(`Error attaching event listeners to widget. ${error.message}`);
        }

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
            Object.keys(devData).forEach((key, index) => {
                if(devData[key]) {
                    // Load the features required percieve persistance
                    switch(key) {
                        case 'position': 
                            updateWidgetPosition(devData[key]);
                            break;
                        case 'backgroundColor': 
                            updateBackgroundColor(devData[key]);
                            break;
                        case 'display': 
                            updateDisplay(devData[key]);
                            break;
                        case 'customControl': 
                            updateCustomCommand(devData[key]);
                            break;
                    }
                } else {
                    console.warn(`Dev Data has an invalid or null value for key: ${key}, ${devData[key]}`);
                }
            });
        } catch (error) {
            return console.error('An error occured when setting the rempaltes data. ' + error);
        }
        initialized = true;
    }

    initializeDevEnv();

    // Compares the update sent and current data and saves it to local storage
    function saveWidgetData(update) {
        if(!initialized) return;
        devData = compareObjects(update, devData);
        localStorage.setItem('devWidget', JSON.stringify(devData));
    }

    function updateDisplay(e) {
        if(e.target) e = e.target.name;
        const devWidget = document.querySelector('.dev-widget');

        if(e === 'hide') {
            if(devWidget.classList.contains('dev-widget-display-hide')) {
                if(!devWidget.classList.contains('dev-widget-invisible')) 
                    devWidget.classList.add('dev-widget-visible')
                devWidget.classList.remove('dev-widget-display-hide', '.dev-widget-display-shrink');
                devWidget.classList.add('dev-widget-display-open');
            } else {
                devWidget.classList.add('dev-widget-display-hide');
                devWidget.classList.remove('dev-widget-display-open', 'dev-widget-display-shrink', 'dev-widget-visible');
            }
        } else if(e === 'shrink') {
            if(devWidget.classList.contains('dev-widget-display-shrink')) {
                devWidget.classList.remove('dev-widget-display-shrink');
                devWidget.classList.add('dev-widget-display-open');
            } else {
                devWidget.classList.add('dev-widget-display-shrink');
                devWidget.classList.remove('dev-widget-display-open', 'dev-widget-display-hide');
            }
        } else if(e === 'invis') {
            const val = devData.backgroundColor ? devData.backgroundColor : '#fff';
            const invert = adjustColor(val, {invert: true});
            if(devWidget.classList.contains('dev-widget-invisible')) {
                devWidget.style.backgroundColor = invert;
                devWidget.classList.remove('dev-widget-invisible');
                devWidget.classList.add('dev-widget-visible');
                addAttrValues([
                    {elem: '.dev-widget button', all: true, 
                    style: true, defualt: false, attr: 'color', value: val},
                    {elem: '.dev-widget-widget input', all: true, 
                    style: true, defualt: false, attr: 'borderBottom', value: 'none'}
                ]);
            } else {
                devWidget.style.backgroundColor = 'transparent';
                devWidget.classList.add('dev-widget-invisible');
                devWidget.classList.remove('dev-widget-visible');
                addAttrValues([
                    {elem: '.dev-widget-widget button', all: true, 
                    style: true, defualt: false, attr: 'color', value: invert},
                    {elem: '.dev-widget-widget input', all: true, 
                    style: true, defualt: false, attr: 'borderBottom', value: `2px solid ${invert}`}
                ]);
            }
        }

        // The computed styles of the wdiget
        devData.widgetSize = getElemComputedStyles({
            elem: devWidget, 
            attrs: ['width', 'height', 'margin-top', 'margin-left'], 
            ops: 'all'
        });
    }

    function runPlayoutCommand(e) {
        console.log(e)
    }

    // Sets the widgets position on the screen. 
    //Can exept Top, Bottom, Right, Left, and or a set of pixel values
    // @param {object} top, right - The positions of the widget
    function updateWidgetPosition(positions) {
        if(!positions) throw new Error('No positions passed to update widget position');
        if(positions.target) positions = positions.target.value;
        try {
            const devWidget = document.querySelector('.dev-widget');
            const input = document.querySelector('.dev-widget-position');
            const convertEmToPx = em => {
                if(typeof em === 'string') em = parseFloat(em);
                if(isNaN(em)) throw new Error('Can not parse em value');
                return em * parseInt(getComputedStyle(devWidget).fontSize)
            },
            convertRemToPx = rem => {
                if(typeof rem === 'string') rem = parseFloat(rem);
                if(isNaN(rem)) throw new Error('Can not parse rem value');
                return rem *  parseInt(getComputedStyle(document.querySelector('html')).fontSize)
            }
            // The computed styles of the wdiget
            if(!devData.widgetSize) devData.widgetSize = getElemComputedStyles({
                elem: devWidget, 
                attrs: ['width', 'height', 'margin-top', 'margin-left'], 
                ops: 'all'
            });

            let convertedPostions = {
                top: 0,
                left: 0
            };

            // Get the widgets total sizes
            devData.widgetSize.totalHeight = devData.widgetSize.height + devData.widgetSize["margin-top"] * 4;
            devData.widgetSize.totalWidth = devData.widgetSize.width + devData.widgetSize["margin-left"] * 4;

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
            // For the top and left positions
            positions.forEach((item, i) => {
                // Check for REM, EM, or PX
                if(isNaN(item)) {
                item = item.toLowerCase();
                    if(item.indexOf('rem') > 0) {
                        convertedPostions[Object.keys(convertedPostions)[i]] = 
                            convertRemToPx(item.substring(0, item.indexOf('rem')));
                    } else if(item.indexOf('em') > 0) {
                        convertedPostions[Object.keys(convertedPostions)[i]] = 
                            convertEmToPx(item.substring(0, item.indexOf('em')));
                    } else if(item.indexOf('px') > 0) {
                        convertedPostions[Object.keys(convertedPostions)[i]] = item.substring(0, item.indexOf('px'));
                    } else {
                        //Keyword Check - Options: Top, Center, Bottom, Left, Right
                        switch(item) {
                            case 'top':
                                convertedPostions.top = 50;
                                break;
                            case 'left':
                                    convertedPostions.left = 50;
                                    break;
                            case 'center':
                                convertedPostions[Object.keys(convertedPostions)[i]] = 
                                    i === 0 
                                        ? window.innerHeight / 2 - devData.widgetSize.totalHeight / 2 
                                        : window.innerWidth / 2 - devData.widgetSize.totalWidth / 2;
                                break;
                            case 'bottom':
                                convertedPostions.top = window.innerHeight - devWidget.clientHeight;
                                break;
                            case 'right':
                                    convertedPostions.left = window.innerWidth - devWidget.clientWidth;
                                    break;
                            default: 
                                throw `"${item}" is not a valid position or keyword`;
                        }
                    }
                } else {
                    convertedPostions[Object.keys(convertedPostions)[i]] = item;
                }
               if(convertedPostions[Object.keys(convertedPostions)[i]] < 0) 
                    convertedPostions[Object.keys(convertedPostions)[i]] = 0;
            });
            if(convertedPostions.top > window.innerHeight - devData.widgetSize.totalHeight) 
                convertedPostions.top = window.innerHeight - devData.widgetSize.totalHeight;
            if(convertedPostions.left > window.innerWidth - devData.widgetSize.totalWidth)
                convertedPostions.left = window.innerWidth - devData.widgetSize.totalWidth;

            convertedPostions.top = Math.ceil(convertedPostions.top);
            convertedPostions.left = Math.ceil(convertedPostions.left);

            devWidget.style.top = convertedPostions.top + 'px';
            devWidget.style.left = convertedPostions.left + 'px';

            input.value = `${positions[0]}, ${positions[1]}`;

            devData.position = {
                top: convertedPostions.top,
                left: convertedPostions.left
            };

            if(!dragging) {
                console.log(`Widget is now positioned at ${devWidget.style.top} X / ${devWidget.style.left} Y.`);
                return saveWidgetData({position: positions});
            }

        } catch (error) {
            let message = typeof error === 'object' ? error.message : error;
            return console.error(`There was an error setting the widgets positions. ${message}`);
        }
    }

    function dragWidget(e) {
        if(dragging) {
            
        }
    }

    function toggleDragWidget(e) {
        if(e.type === 'mousedown') {
            dragging = true;
            document.addEventListener('mousemove', dragWidget);
        } else {
            dragging = false;
            document.removeEventListener('mousemove', dragWidget);
        }
    }

    function updateBackgroundColor() {

    }

    function updateCustomCommand() {

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

    // Compares two objects and returns a new update object
    // @param {object} obj1 - The new object
    // @param {obejct} obj2 - The old object to be updated
    // @returns {object} The updated object
    const compareObjects = (obj1, obj2) => {
        if(!obj1 || !obj2 | !Object.keys(obj1).length) return false;
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
<div class="dev-controller open">
    <!-- Visibility Controls -->
    <button class="hide" onclick="hideControls()"></button>
    <button class="shrink" onclick="shrinkControls()"></button>
    <button class="invis" onclick="removeBackground(event)"></button>
    <!-- Template Options -->
    <div class="options span-columns">
        <input type="text" class="position" onblur="moveWidget(event)" placeholder="Top, Bottom, Right, Left"/>
        <input id="dev-bkg-color" type="text" placeholder="Set Background Color" onblur="setBackgroundColor(event)"/>
        <div class="custom-command">
            <input id="dev-custom-commands" type="text" onblur="setCustomCommand(event)" placeholder="Custom Command"/>
            <button type="button" onclick="runCustomCommand()">Run</button>
        </div>
    </div>
    <!-- Playout Controls -->
    <div class="controls span-columns">
            <button class="play control" ></button>
            <button class="next control" onclick="next()" ></button>
            <button class="stop control" onclick="stop()" ></button>
        </div>
</div>
`
    }

    function getRAWCSS() {
        return `

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
    if(val.includes('/')) {
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

// Attemps to run a function on the global scope, typically a custom command
const runCustomCommand = () => {
    if(!devData.customCommand) return;
    if(typeof window[devData.customCommand] === 'function') return window[devData.customCommand]();
    return console.error(`Unable to execute ${devData.customCommand}`);
}