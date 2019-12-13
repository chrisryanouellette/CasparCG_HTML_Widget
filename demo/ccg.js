'use strict';

/*  CasparCG Standard Graphic
    Adds life cycle functions, animation functions, server (client) interaction, 
    and timeine management.
*/

const ccg = (function() {
    /*   
        Define all the varaibles the graphic will need
    */
    // The server (client) the template is interacting with
    const SERVER = {
        isAuthenitcated: false,
        URL: null,
        WS_URL: null,
        ws: null,
        channels: {
            error: 'error',
            log: 'log'
        }
    }

    const graphic = {
        ENV: 'PROD',
        initialized: false,
        localName: '',
        playoutInfo: {
            channel: null,
            layer: null,
            // progress = 0 -> Template needs to be loaded
            // progress = 1 -> Template has been loaded, needs to be played
            // progress = 2 -> Template has been advanced, needs to be advanced again or stopped
            progress: 0,
            playOnLoad: null,
            autoComplete: null,
            duration: null,
            removeSelf: null,
            clearSelf: null,
            hasBeenCleared: false
        },
        data: null,
        validation: null,
        customCommands: []
    }

    const commandBuffer = {
        threshold: 3,
        commands: []
    };

    // Initalize graphic
    (function() {
        
        // Define requried global functions
        try {
            window.update = (raw) => checkCommandBuffer(update, raw);
            window.play = () => checkCommandBuffer(play);
            window.next = () => checkCommandBuffer(next);
            window.stop = () => checkCommandBuffer(stop);
            window.remove = () => checkCommandBuffer(remove);
        } catch (error) {
            return logMessage({message: 'Error loading standard playout functions' + error.message, error: true});
        }
        SERVER.URL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/';
    }());

    //  Authenticates the template with the Server connected to Caspar
    //  @param {string} username - Username provided by the Server to login
    //  @param {string} password - Password provided by the Server to login
    //  @param {string} [n] SERVER_URL - The Server Url that needs to be updated.
    //  @returns {Promise} An Promise resolving if the autheitcation succeeds.
    function authenticate({username, password, URL, PATH}) {
        return new Promise((resolve, reject) => {
            try {
                if(!username || !password) throw new Error('Missing username or password')
                // Sets the graphics Server URL if the Template is not initilized
                if(URL && !graphic.initialized) SERVER.URL = URL;
                if(!PATH) PATH = 'login';
                fetch(SERVER.URL + PATH, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                })
                .then(res => res.json())
                .then(result => {
                    graphic.isAuthenitcated = true;
                    return resolve();
                }).catch(error => reject(error.message));
            } catch (error) {
                return reject(error.message);
            }
        });
    }

    // Initalizes a development enviorment for the template
    // @param {string || boolean} dev - The name of the dev script to load
    function initalizeDevelopmentEnviorment(dev) {
        // Check for global ENV variable
        try {
            if(dev) {
                graphic.ENV = 'DEV';
            } else {
                if(ENV && ENV === 'DEV') graphic.ENV = 'DEV';
            }
        } catch (error) {
            return logMessage({message: 'Error loading enviorment', error: true});
        }
        if(graphic.ENV === 'DEV') {
            logMessage({message: 'Template is in Development mode'});
            if(typeof dev === 'string') loadServerAsset({url: dev});
        } else {
            graphic.ENV = 'PROD'
            logMessage({message: 'Template is in Production mode'});
        }
    }

    // Checks if a command is currently running
    // @param {function} command - The command to be ran
    // @param {any} param - The parmeter to be passed to the function
    async function checkCommandBuffer(command, param) {
        if(graphic.playoutInfo.hasBeenCleared) {
            commandBuffer.commands = [];
            return logMessage({message: 'Graphic has been cleared', error: true});;
        }
        if(typeof commandBuffer.threshold === 'number' 
        && commandBuffer.commands.length >= commandBuffer.threshold) {
            return logMessage({message: 'The command threshold of ' + commandBuffer.threshold +' has been met', error: true});
        }
        if(commandBuffer.commands.length && command) {
            commandBuffer.commands.push({command, param});
        } else {
            if(command) commandBuffer.commands.push({command, param});
            await runFn(null, commandBuffer.commands[0].command, commandBuffer.commands[0].param).then(() => {
                commandBuffer.commands.shift();
                if(commandBuffer.commands.length) checkCommandBuffer();
            }).catch(e => {
                logError(e);
                commandBuffer.commands = [];
                return logMessage({message: e, error: true});
            });
        }
    }

    /*
         Standard Playout Commands
    */
    async function update(raw) {
        if(graphic.playoutInfo.hasBeenCleared) 
            return logMessage({message: 'Template has been cleared', error: true});
        if(!graphic.initialized) {
            // Attempt to run graphicDidMount
            await runFn(ccg, 'graphicDidMount').catch(error => {
                return logMessage({message: 'Error in Graphic Did Mount: ' + error, error: true});
            });
        }
        // Attempt to parse JSON
        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (error) {
            return logMessage({message: 'Error parsing JSON data', error: true});
        }
        if(!graphic.isAuthenitcated) {
            // Attempt Authenitcation
            try {
                await authenticate({
                    username: parsed.server.username, 
                    password: parsed.server.password, 
                    URL: parsed.server.URL, 
                    PATH: parsed.server.PATH
                }).then(() => attemptWSConnection({URL: parsed.WSURL, PATH: parsed.WSPATH})).catch(error => {
                    throw new Error(error);
                });
            } catch (error) {
                if(parsed.BYPASS || graphic.ENV === 'DEV') {
                    delete parsed.BYPASS;
                } else {
                    return logMessage({message: error.message, error: true});
                }
            }
        }
        // Attempt to run graphicWillUpdate
        await runFn(ccg, 'graphicWillUpdate', {parsed: parsed.data, data: graphic.data, setTemplateData}).catch(error => {
            return logMessage({message: 'Error in Graphic Will Update: ' + error, error: true});
        });
        // Get Playout Info
        if(!graphic.initialized) {
            try {
                if(!parsed.playoutInfo || typeof parsed.playoutInfo !== 'object') 
                    throw new Error('Missing playout info for Graphic');
                Object.keys(parsed.playoutInfo).forEach(key => {
                    if(typeof parsed.playoutInfo[key] === 'function') return;
                    graphic.playoutInfo[key] = parsed.playoutInfo[key];
                });
                if(isNaN(graphic.playoutInfo.channel)) throw new Error('Missing playout info: Channel');
                if(isNaN(graphic.playoutInfo.layer)) throw new Error('Missing playout info: Layer');
                if(parsed.name) graphic.localName = parsed.name;
            } catch (error) {
                return logMessage({message: error.message, error: true});
            }
        }
        // Validate Data
        if(graphic.validation) {
            try {
                setTemplateData(parsed.data);
            } catch (error) {
                logError(error.message);
                return logMessage({message: error.message, error: true});
            }
        }
        // Call the Update Element Data life cycle function
        await runFn(ccg, 'updateElementData', graphic.data).catch(error => {
            return logMessage({message: 'Error in Update Element Data: ' + error, error: true});
        });
        
        // Attempt to run graphicDidUpdate
        await runFn(ccg, 'graphicDidUpdate', {
            data: graphic.data, 
            playoutInfo: graphic.playoutInfo
        }).catch(error => {
            return logMessage({message: 'Error in Graphic Did Update: ' + error, error: true});
        });

        graphic.initialized = true;
        if(graphic.ENV === 'DEV')logMessage({message: graphic.localName + ' Completed: Update'});
        // If the template is being loaded 
        if(parsed.isLoadData) {
            // Attempt to call Setup Animation
            await runFn(ccg, 'setupAnimation').catch(error => {
                return logMessage({message: 'Error in Setup Animation: ' + error, error: true});
            });
        }
        if(graphic.playoutInfo.progress >= 0) graphic.playoutInfo.progress = 1;
        if(graphic.playoutInfo.playOnLoad) window.play();
    }

    // Play Command
    // progress 1
    function play() {
        return new Promise((resolve, reject) => {
            // Check the playout status
            const result = checkPlayOutProgress(1);
            if(result !== true) return reject('Graphic needs to be ' + result);
            runFn(ccg, 'animateIn').then(res => {
                if(res !== undefined && res !== true) throw res;
                graphic.playoutInfo.progress = 2;
                if(graphic.ENV === 'DEV') logMessage({message: graphic.localName + ' Completed: Play'});
                if(graphic.playoutInfo.autoComplete) {
                    if(typeof graphic.playoutInfo.duration === 'number') {
                        setTimeout(window.next, graphic.playoutInfo.duration * 1000);
                    } else {
                        window.next();
                    }
                }
                return resolve();
            }).catch(e => {
                return reject('Error playing graphic: ' + e);
            });
        });   
    }

    // Next Command
    // progress 2
    function next() {
        return new Promise((resolve, reject) => {
            // Check the playout status
            const result = checkPlayOutProgress(2);
            if(result !== true) return reject('Graphic needs to be ' + result);
            runFn(ccg, 'shouldAdvance', {data: graphic.data, playoutInfo: graphic.playoutInfo}).then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
            }).then(() => runFn(ccg, 'advanceOut')).then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
            }).then(() => runFn(ccg, 'advanceData', graphic.data)).then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
            }).then(() => runFn(ccg, 'advanceIn')).then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
                if(graphic.ENV === 'DEV') logMessage({message: graphic.localName + ' Completed: Next'});
                if(graphic.playoutInfo.autoComplete) {
                    if(typeof graphic.playoutInfo.duration === 'number') {
                        setTimeout(window.next, graphic.playoutInfo.duration * 1000);
                    } else {
                        window.next();
                    }
                }
                return resolve();
            }).catch((e) => {
                // A solution function was sent back
                if(typeof e === 'function') {
                    e();
                    return resolve();
                }
                return reject('Error advancing template: ' + e)
            });
        })
    }

    // Stop Command
    // progress 2
    function stop() {
        return new Promise((resolve, reject) => {
            // Check the playout status
            const result = checkPlayOutProgress(2);
            if(result !== true) return reject('Graphic needs to be ' + result);
            runFn(ccg, 'animateOut').then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
                graphic.playoutInfo.progress = 1;
                return true;
            }).then(() => {
                if(graphic.ENV === 'DEV') logMessage({message: graphic.localName + ' Completed: Stop'});
                if(graphic.playoutInfo.autoComplete) graphic.playoutInfo.autoComplete = false;
                if(graphic.playoutInfo.removeSelf) return remove();
                return resolve();
            }).catch(e => {
                return reject('Error stopping template: ' + e);
            });
        });
    }

    // Remove Command
    async function remove() {
        return new Promise((resolve, reject) => {
            runFn(ccg, 'removeTemplate', {data: graphic.data, playoutInfo: graphic.playoutInfo})
            .then(res => {
                if(res !== undefined && res !== true) throw new Error(res);
                if(graphic.ENV === 'DEV') logMessage({message: graphic.localName + ' Completed: Remove'});
                if(graphic.playoutInfo.clearSelf) clearTemplate();
                return resolve();
            }).catch(e => {
                return reject('Error removing template: ' + e);
            });
        });
    }

    // Attemps to log a message to the server to remove the template
    // @param {string} message - The message to be sent to the server
    // @param {boolean} error - True is the removal is because of an error
    function clearTemplate(message, error) {
        graphic.playoutInfo.hasBeenCleared = true;
        logMessage({message: {remove: true, message}, channel: 'remove', error});
        return window.close();
    }

    // Creates a function on the global scope with the provided name and function
    // @param {string} name - The name of the custom command
    // @param {function} fn - The function to run when the custom command is called
    function registerCC(name, fn) {
        if(!name || typeof name !== 'string') return logMessage({message: 'Custom Command requires name', error: true});
        if(typeof fn !== 'function') return logMessage({message: 'Invalid function for command ' + name, error: true});
        window[name] = () => checkCommandBuffer(fn)
        graphic.customCommands.push(name);
    }

    // Defines an object to be used for data validation
    // @param {object} def - The object to be used for validation
    function defineData(def) {
        if(typeof def !== 'object') 
            return logMessage({message: 'Invalid data validation', error: true});
        graphic.validation = def;
    }

    // Validates a data object against the graphics validation object
    // @param {object} data - The data to be validatad
    // @returns {object} An object with an isValid flag, 
    //      errors if there where any, 
    //      and the verified data if there where no errors
    function validataDataSet(data) {
        if(typeof data !== 'object') return {isValid: false, message: 'Data is not an Object'};
        // Checks a piece of data agains a validation object or string
        // @param {string || object} v - The valitation string or object to be used
        // @param {any} item - The item to be validated
        // @param {string || number} key = The key that was used to get the data
        // @returns {sting || boolean} Either an string as an error or a boolean as true for valid
        function validataData(v, item, key) {
            let type = v;
            if(typeof v === 'object') {
                // Check if value is required and pressent
                if(v.required && !item.length) return key + ' is required';
                type = v.type;
            }
            switch(type) {
                case 'string':
                    if(typeof item === 'object' || (item.length && typeof item !== 'string')) 
                        return item + ' is an invalid string (' + typeof item + ')';
                    break;
                case 'number':
                    if(isNaN(item) || typeof item === 'string') 
                        return item + ' is an invalid number (' + typeof item + ')';
                    if(typeof v === 'object') {
                        if(v.min !== undefined && v.min > item) 
                            return 'Invalid number ' + item + ' Min: ' + v.min;
                    }
                    break;
                case 'array':
                    if(!Array.isArray(item)) 
                        return item + ' is an invalid array';
                    if(typeof v === 'object') {
                        if(v.children && item.length < 1) 
                            return key + ' needs atleast 1 child';
                    }
                case 'object':
                    if(Array.isArray(item) || typeof item !== 'object')
                        return key + ' is an invalid object';
                    if(typeof v === 'object') {
                        if(v.children && Object.keys(item).length < 1) 
                            return key + ' needs atleast 1 child';
                    }
                    break;
                default:
                    return type + ' is an invalid data type';
            }
            return true;
        }

        // Validates a child object or peice of data
        // @param {array} acc - An error or errors or invalid operations
        // @param {any} v - The vurrent validation object, array, string, or number
        // @param {any} data - The current peice of data to be validated
        // @param {string || number} key - The key used to get to the current location
        // @returns {any} - A validated peice of data
        function validataChildren(acc, v, data, key) {
            if(!acc) acc = [];
            if(data === undefined || data === null) {
                if(isNaN(key)) {
                    acc.push(`Missing key: ${key}`);
                } else {
                    acc.push(`Missing key: ${Object.keys(v)}`);
                }
                return;
            }
            // Found a data value
            if(typeof v === 'string' || (typeof v === 'object' && v.type)) {
                const error = validataData(v, data, key);
                if(error !== true) {
                    acc.push(error); 
                    return null;
                }
                return data;
            // Type array
            } else if(Array.isArray(v)) {
                if(!Array.isArray(data)) acc.push(`'${key}' is not a invalid data set. Array`);
                const valid = [];
                const errors = data.reduce((acc, item, i) => {
                    // If there are mutiple array, validatate against each one
                    const validator = v.length > 1 ? v[i] : v[0];
                    // Validate sub data set
                    const result = validataChildren(acc, validator, data[i], i);
                    if(result) valid.push(result);
                    return acc;
                }, []);
                if(errors.length) {
                    acc.push(...errors);
                    return null;
                }
                return valid;
            // Type object
            } else if(typeof v === 'object' && !v.type) {
                if(typeof data !== 'object' || Array.isArray(data)) {
                    acc.push(key + ' is an invalid object');
                    return acc;
                }
                const valid = {};
                acc.push(...Object.keys(v).reduce((acc, key) => {
                    // Validate sub data set
                    const result = validataChildren(acc, v[key], data[key], key);
                    if(result !== null) valid[key] = data[key];
                    return acc;
                }, []));
                return valid;
            } else {
                acc.push(`Invalid data type: ${typeof data} wanted ${typeof v}`);
                return null;
            }
        }
        
        let validData = {};
        const errors = Object.keys(graphic.validation).reduce((acc, key) => {
            validData[key] = validataChildren(acc, graphic.validation[key], data[key], key);
            return acc;
        }, []);
        if(errors.length) return {isValid: false, message: errors};
        return {isValid: true, data: validData};
    }

    /*
        Helper functions
        ---------------------------------------------
    */

    // Attempts to connect to a Web Socket Server
    // @param {string} PATH [n] - An optional path to the WS Server
    // @returns {Promise} - Resolves if the WS connection is successful
    function attemptWSConnection({URL, PATH}) {
        return new Promise((resolve, reject) => {
            try {
                // Close any current connections
                if(SERVER.ws && SERVER.ws.close) {
                    SERVER.ws.close(1000, 'Re-establishing websocket connection');
                }
                // Get a defualt ws URL if there is not one
                if(!SERVER.WS_URL && !graphic.initialized) {
                    let host = URL ? URL : SERVER.URL.substring(4);
                    if(host.indexOf('s') === 0) host.slice(1);
                    if(PATH) host += PATH;
                    SERVER.WS_URL = 'ws' + host;
                }

                // Attempt to connect
                SERVER.ws = new WebSocket(SERVER.WS_URL);
                SERVER.ws.onopen = resolve;
                SERVER.ws.onmessage = function(event) {/* Do something with Data*/ }
                SERVER.ws.onerror = function() {
                    reject('Error in Web Socket connection to ' + SERVER.WS_URL);
                }
            } catch (error) {
                return reject('Error in Web Socket connection to ' + SERVER.WS_URL);
            }
        });
    }

    //  Checks the result of an HTTP Request
    //  @param {object} res - The HTTP Result
    //  @returns {Promise Result} The result of the request
    function checkRequestResult(res, resolve, reject) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            if(res.status < 200 || res.status >= 300) 
                return res.json().then(result => reject(result));
            res.json().then(result => resolve(result));
        } else {
            if(res.status < 200 || res.status >= 300) 
                return reject('Error with request.' + res.url);
            return resolve(res);
        }
    }

    //  Handy fetch request. Only excepts JSON
    //  @param {string} url - The URL to send the request to
    //  @param {string} method [n] - The method to send the request as
    //  @param {object} body - The object that needs the be stringifed and sent to the server
    //  @returns {Promise} An Promise resolving to an HTTP response from the server.
    function Fetch(url, method, body) {
        return new Promise((resolve, reject) => {
            if(graphic.ENV === 'DEV' && !SERVER.isAuthenitcated) {
                console.log('FETCH:', body);
                return resolve();
            }
            if(!url) return reject('Missing URL for Fetch request');
            const headers = {method: method.toUpperCase() || "GET", headers: {}};
            if(method !== 'GET' && body) 
                headers.headers["Content-Type"] = "application/json";
            headers.credentials = 'same-origin';
            if(body) {
                if(graphic.initialized) {
                    body.localName = graphic.localName;
                    body.channel = graphic.playoutInfo.channel;
                    body.layer = graphic.playoutInfo.layer;
                }
                headers.body = JSON.stringify(body);
            }
            return fetch(serverUrl + url, headers)
            .then(res => checkRequestResult(res, resolve, reject))
            .catch(error => checkRequestResult(error, resolve, reject));
        });
    };

    // Logs a message to the server (client)
    // @param {string} message - The message to be logged
    // @param {string} command [n] - The command to use when loggong the message
    // @param {string} channel - The url or websocket channel to send the message to
    // @param {boolean} error - If the message is an error message
    // @returns {promise} - A Promise that resolves when the message is successfully sent.
    function logMessage({message, command, error}) {
        if(SERVER.isAuthenitcated) {
            return new Promise((resolve, reject) => {
                const channel = error ? server.channels.error : server.channels.log;
                if(SERVER.ws) {
                    try {
                        SERVER.ws.send({channel, message, level, command, error});
                    } catch (error) {
                        return reject('An error occured when sending the WebSocket message: ' + error.message);
                    }
                    return resolve();
                } else {
                    Fetch(SERVER.URL + channel, 'POST', {message, level, command, error})
                    .then(() => {
                        if(graphic.ENV === 'DEV') 
                            console.log(`Message successfully sent: ${message}`);
                        return resolve();
                    }).catch(error => reject('Error with request: ' + error));
                }
            });
        } else {
            if(error) {
                console.error(message);
            } else {
                if(graphic.ENV === 'DEV') {
                    return console.log(message);
                } else {
                    console.warn(message);
                }
            }
            return console.error('Template is not authenticated');
        } 
    }

    // Checks the graphics play out progress and compares it to the wanted progress
    // @param {number} wanted - The desired progress
    // @returns {string || boolean} - A string for the required command to match or 
    //      a true if the wanted param matches the progress 
    function checkPlayOutProgress(wanted) {
        const progress = graphic.playoutInfo.progress;
        switch(progress) {
            case 0:
                if(wanted === progress) {
                    return true;
                } else {
                    return 'loaded';
                }
            case 1:
                if(wanted === progress) {
                    return true;
                } else {
                    return 'played';
                }
            case 2:
                if(wanted === progress) {
                    return true;
                } else {
                    return 'advanced or stopped';
                }
            default: 
                return 'cleared';
        }
    }

    // Runs a lifecycle method on the ccg object
    // @param {function} fn - The function to try and run
    // @param {object} params - The parameters to be passed
    // @returns {boolean} - Status if the command succeeded or not
    function runFn(parent, fn, params) {
        return new Promise((resolve, reject) => {
            if(typeof fn === 'function' || (parent && typeof parent[fn] === 'function')) {
                try {
                    const result = parent 
                        ? parent[fn](params)
                        : fn(params);
                    if(result && result.then) {
                        result.then(() => resolve()).catch(error => {return reject(error)});
                    } else {
                        if(result && result.error) {
                            if(!result.solution) throw new Error(result.message);
                            throw {message: result.solution}
                        }
                        return resolve();
                    }
                } catch (error) {
                    return reject(error.message);
                }
            } else {
                return resolve();
            }
        });
    }

    // Loads the assets passed to the template
    // @param {array || object} sources - The sources to be loaded. 
    //      Can be a stylesheet, javascript file, or HTML/SVG document, SVG Image, image, or video
    //      Requires url prop. 
    //      Requires element nodename (element prop) if creating an Image, Video, or SVG Image
    // @returns {promise} - A Promise that resolves if all the assets load successfully
    function loadServerAsset(sources) {
        if(!Array.isArray(sources)) sources = [sources];
        return Promise.all(sources.map(src => {
            // Create a new promise to manage each network request
            return new Promise((resolve, reject) => {
                // Get the previous element or the main element
                const prevElement = src.previousElement 
                    ? document.querySelector(src.previousElement)
                    : document.querySelector('main');
                // Load HTML or SVG
                if(src.url.includes('html') || src.url.includes('svg')) {
                    fetch(src.url, {method: 'GET'})
                    .then(res => res.text())
                    .then(res => {
                        try {
                             // Parse the result
                            const parser = new DOMParser();
                            const html = parser.parseFromString(res, "text/html");
                            const element = html.childNodes[0].childNodes[1].childNodes[0];
                            // Insert it after the previous element
                            prevElement.parentElement.insertBefore(element, prevElement.nextSibling);
                            return resolve();
                        } catch (error) {
                            return reject('Error getting asset ' + src.url);
                        }
                       
                    }).catch(error => {
                        return reject('Error loading ' + src.url);
                    });
                // Load CSS file
                } else if(src.url.includes('css')) {
                    try {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = src.url;
                        link.onerror = () => reject('Cannot load CSS file: ' + src.url);
                        link.onload = () => resolve();
                        document.querySelector('head').append(link);
                    } catch (error) {
                        return reject('Error loading CSS ' + src.url);
                    }
                // Load JS file
                } else if(src.url.includes('js')) {
                    try {
                        const script = document.createElement('script');
                        script.type = 'application/javascript';
                        script.src = src.url;
                        script.onerror = () => reject('Error loading JS file: ' + src.url);
                        script.onload = () => resolve();
                        document.querySelector('body').append(script);
                    } catch (error) {
                        return reject('Error loading JS ' + src.url);
                    }
                // Load SVG Image, image, or video
                } else if(src.element) {
                    const element = src.element === 'image' 
                        ? document.createElementNS('http://www.w3.org/2000/svg','image')
                        : document.createElement(src.element);
                    prevElement.parentElement.insertBefore(element, prevElement.nextSibling);
                    switch(element.nodeName) {
                        case('IMG') :
                            element.src = src.url;
                            element.onload = () => resolve();
                            element.onerror = error => 
                                reject('Unable to image ' + src.url);
                            break;
                        case('image') :
                            element.setAttribute('xlink:href', src.url);
                            element.addEventListener('load', () => resolve());
                            element.addEventListener('error', error => 
                                reject('Unable to SVG image ' + src.url));
                            break;
                        case('VIDEO') : 
                            element.src = src.url;
                            element.addEventListener('canplay', () => resolve());
                            element.addEventListener('error', error => 
                                reject('Unable to video ' + src.url));
                            break;
                        default:
                            reject('Invalid asset')
                    }
                } else {
                    return reject('Invalid asset.');
                }
            });
        }));
    }

    function setTemplateData(data) {
        const result = validataDataSet(data, graphic.validation);
        if(!result.isValid) throw new Error('Data is not valid: ' + result.message);
        graphic.data = result.data;
        return;
    }

    /*
        All the available functions to interact with the template
    */
    return {
        // Graphic Information
        graphicInfo: () => {return {
            ENV: graphic.ENV,
            channel: graphic.playoutInfo.channel,
            layer: graphic.playoutInfo.layer,
            initialized: graphic.initialized,
            localName: graphic.localName,
            server: SERVER.URL,
            customCommands: graphic.customCommands,
            data: graphic.data
        }},
        logGraphicInfo: (channel) => logMessage({message: {
            ENV: graphic.ENV,
            channel: graphic.playoutInfo.channel,
            layer: graphic.playoutInfo.layer,
            initialized: graphic.initialized,
            localName: graphic.localName,
            server: SERVER.URL,
            customCommands: graphic.customCommands,
            data: graphic.data
        }, channel}),
        progress: () => {return graphic.playoutInfo.progress},
        data: () => {return graphic.data},
        
        // Graphic Setup Functions
        defineData,
        registerCC,

        // Life Cycle Functions 
        graphicDidMount: null,
        graphicWillUpdate: null,
        graphicDidUpdate: null,
        updateElementData: null,
        setupAnimation: null,
        animateIn: null,
        shouldAdvance: null,
        advanceOut: null,
        advanceData: null,
        advanceIn: null,
        animateOut: null,
        removeTemplate: null,
        clearTemplate,

        // Helper Functions
        logMessage,
        loadServerAsset,

        // Development Functions
        initalizeDevelopmentEnviorment
    };
}());