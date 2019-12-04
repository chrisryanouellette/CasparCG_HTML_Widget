'use strict';

// Setting up the default data for the template
const DEMO = (function() {
    // The IndexedDB Options
    const DB = {
        DB_NAME: 'dev-widget',
        DB_VERSION: 1,
        DB_STORE_NAME: 'template-data',
        db: null
    }

    // The minimum required data to run the graphic
    const fakeData = {
        location: window.location.pathname.substring(1).replace(/\//g, '-'),
        name: 'DEMO',
        data: {
            name: 'Demo Lower Third',
            text: [
                {
                    name: 'John Smith',
                    title: 'President'
                }, {
                    name: 'Jane Adams',
                    title: 'Accounting Manmanger'
                }
            ], style: {
                primaryColor: '#789',
                textColor: '#000',
                position: 'center'
            }, playoutInfo: {
                channel: 1,
                layer: 1,
                playOnLoad: false,
            }
        }
    }

    // Connects to the browser's Indexed DB
    function opendDBConnection() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB.DB_NAME, DB.DB_VERSION);
            req.onsuccess = function(e) {
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

    // Updates the tempalte dat in the browser's indexed DB
    // @param {object} data - The data to be updated or saved
    function modifyTemplateData(data) {
        return new Promise((resolve, reject) => {
            const store = getObjectStore(DB.DB_STORE_NAME, 'readwrite');
            const req = store.get(data.location);
            req.onerror = function(error) {
                return reject("modfiyTemplateData: " + evt.target.errorCode);
            }
            req.onsuccess = function(e) {
                if(!e.target.result) {
                    store.add(data);
                }
                return resolve();
            }
        });
    }

    // Initializes the template setup
    opendDBConnection()
    .then(() => modifyTemplateData(fakeData))
    .then(() => {
        if(!localStorage.getItem('devWidget')) {
            const parser = new DOMParser();
            const message = parser.parseFromString(
`
Welcome to CasparCG HTML Widget! </br>
<hr>
To begin, press the <span class="update">Update</span> button followed by the <span class="play">Play</span> button to animate in the graphic. </br>
<hr>
The three custom commands are 'reset', 'previousTag', and 'nextTag'.</br>
<hr>
Click <span class="update">Update Data</span> to edit the data values the template is using. </br>
<hr>
To remove data, select "remove" option in the drop down menu.
`, "text/html"
            );
            return logMessage(message.querySelector('body').childNodes);
        } else {
            return logMessage('Welcome to the CasparCG HTML Widget.');
        }
    });

    return {
        // Clears all the messages on the message board
        clearMessageBoard: () => {
            const messages = document.querySelector('.messages');
            messages.innerHTML = '';
        },
        // Logs a message to the message board
        logMessage: (message, error) => {
            const messages = document.querySelector('.messages');
            const p = document.createElement('p');
            if(typeof messages === 'string') {
                p.textContent = message;
            } else {
                p.append(...message);
            }
            
            if(error) p.classList.add('error');
            messages.appendChild(p);
            messages.scrollTop = messages.scrollHeight;
        },
        // Displays or hides the message board
        toggleMessageBoard: () => {
            const messageCon = document.querySelector('.message-container');
            if(!messageCon.classList.contains('open')) {
                messageCon.classList.add('open');
                messageCon.classList.remove('close');
            } else {
                messageCon.classList.add('close');
                messageCon.classList.remove('open');
            }
        }
    }
})();