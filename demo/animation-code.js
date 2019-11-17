'use strict';

const ENV = 'PROD';

// Change DEV_SCRIPT_URL to the url the dev.js script will be served from 
const DEV_SCRIPT_URL = 'http://localhost:3000/dev.js';

window.onload = () => {
    try {
        if(ENV && ENV === 'DEV') {
            const script = document.createElement('script');
            script.type = "application/javascript";
            script.src = DEV_SCRIPT_URL;
            document.querySelector('body').append(script);
        }
    } catch (error) {
        return console.error('Error attempting to test env.')
    }
};