'use strict';

const ENV = 'DEV';

// Change DEV_SCRIPT_URL to the url the dev.js script will be served from 
const DEV_SCRIPT_URL = 'http://localhost:3000/dev.js';

// Loads the dev script
window.onload = () => {
    ccg.initalizeDevelopmentEnviorment(DEV_SCRIPT_URL);
};

// The index of data to show
let index = 0;

ccg.defineData({
    text: [{
        name: {type: 'string', required: true},
        title: 'string'
    }],
    style: {
        primaryColor: {type: 'string', required: true},
        textColor: {type: 'string', required: true},
        position: 'string'
    }
});

// Promise that waits for all the template style and text data to be set
ccg.updateElementData = function(data) {
    return new Promise((resolve, reject) => {
        Promise.all([setUpStyles(data.style), setUpTexts(data.text)])
        .then(() => {
            index++;
            logMessage('Graphic has been Updated');
            return resolve();
        })
        .catch(error => reject(error));
    });
}

// Set all gthe templates styles
function setUpStyles(style) {
    return new Promise((resolve, reject) => {
       try {
            const h1 = document.querySelector('h1'),
                p = document.querySelector('p'),
                tag = document.querySelector('.tag'),
                nameBKG = document.querySelector('.name-bkg'),
                subtitle = document.querySelector('.subtitle');

            h1.style.color = style.textColor;
            p.style.color = style.textColor;
            nameBKG.style.stroke = style.primaryColor;
            subtitle.style.backgroundColor = style.primaryColor;

            switch(style.position) {
                case 'center': 
                    tag.style.alignItems = 'center';
                    break;
                case 'right':
                    tag.style.alignItems = 'flex-end';
                    break;
                default:
                    tag.style.alignItems = 'flex-start';
                    break;
            }

            return resolve();
       } catch (error) {
           return reject(`Failed to set styles`);
       }
    });
}

// Sets all the templates element's text
function setUpTexts(text) {
    return new Promise((resolve, reject) => {
        try {
            if(index <= text.length - 1) {
                const name = text[index].name,
                    h1 = document.querySelector('h1'),
                    span = document.createElement('span'),
                    p = document.querySelector('p');
        
                h1.textContent = name.substring(0, name.indexOf(' '));
                span.textContent = name.substring(name.indexOf(' '));
                h1.appendChild(span);
                p.textContent = text[index].title;
    
                return resolve();
            } else {
                return reject(`Out of names to display (${text.length})`);
            }
        } catch (error) {
            return reject(`Error settings it texts. ${error}`)
        }
    });
}

// Sets the Elements initial state
ccg.setupAnimation = function() {
    return new Promise((resolve, reject) => {
        try {
            const tl = new TimelineMax({onComplete: resolve});
            let h1Width = window.getComputedStyle(document.querySelector('h1'))
                .getPropertyValue('width');
            let h1Padding = window.getComputedStyle(document.querySelector('h1'))
                .getPropertyValue('padding-left');
            h1Width = Number(h1Width.substring(0, h1Width.indexOf('px')));
            h1Padding = Number(h1Padding.substring(0, h1Padding.indexOf('px')));

            const width = h1Width + (h1Padding * 2);
               
            
            tl.set('#main-clip rect:first-of-type', {x: `-${width / 2 + 10}`})
                .set('#main-clip rect:last-of-type', {x: width / 2 + 10})
                .set('.container', {width})
                .set('h1', {y: '5vh'})
                .set('.subtitle', {y: '-5vh'})
                .set('#subtitle-clip rect', {
                    transformOrigin: 'center center',
                    scaleX: 0
                })
                .set('.tag', {opacity: 1});
        } catch (error) {
            return reject(error);
        }
    });
}

ccg.animateIn = function() {
    return new Promise((resolve, reject) => {
        try {
            const tl = new TimelineMax({onComplete: resolve});
            tl.to('#subtitle-clip rect', 1, {scaleX: 1,ease: Power2.easeInOut})
                .to('.subtitle', .5, {y: 0,ease: Power2.easeInOut}, '-=.25')
                .to(document.querySelectorAll('#main-clip rect'), 1, {x: 0,ease: Power2.easeInOut}, '-=.5')
                .to('h1', .5, {y: 0,ease: Power2.easeOut}, '-=.5')
                .set(['.name-con', '.subtitle'], {"clip-path": 'none'});
        } catch (error) {
            return reject(error);
        }
   }).then(() => {
       logMessage('Graphic has Animated In');
   });
}

ccg.shouldAdvance = function({data, playoutInfo}) {
    if(index <= data.text.length - 1) {
        return true;
    } else {
        if(playoutInfo.autoComplete) return {error: true, solution: window.stop};
        return {error: true, message: `Graphic is out of tags`};
    }
}

ccg.advanceOut = function() {
    return new Promise((resolve, reject) => {
        try {
            const tl = new TimelineMax({onComplete: resolve});
            let width = window.getComputedStyle(document.querySelector('.container'))
                .getPropertyValue('width');
            width = width.substring(0, width.indexOf('px'));
    
            tl.to('h1', .5, {x: width})
                .to('p', .5, {y: '3vh'}, '-=.5')
                .set('.container', {width})
                .set('h1', {opacity: 0});
        } catch (error) {
            return reject(error);
        }
    });
}

ccg.advanceData = function(data) {
    return new Promise((resolve, reject) => {
        setUpTexts(data.text).then(() => {
            index++;
            return resolve();
        });
    });
}

ccg.advanceIn = function() {
    return new Promise((resolve, reject) => {
        try {
           const tl = new TimelineMax({onComplete: resolve});
           let h1Width = window.getComputedStyle(document.querySelector('h1'))
               .getPropertyValue('width');
           let h1Padding = window.getComputedStyle(document.querySelector('h1'))
               .getPropertyValue('padding-left');
           h1Width = Number(h1Width.substring(0, h1Width.indexOf('px')));
           h1Padding = Number(h1Padding.substring(0, h1Padding.indexOf('px')));

           const width = h1Width + (h1Padding * 2);


            tl.set('h1', {x: width * 2, opacity: 1})
                .to('.container', .5, {width: width})
                .to('h1', .5, {x: 0,ease: Power2.easeOut}, '-=.25')
                .to('p', .5, {y: 0}, '-=.5');
        } catch (error) {
            return reject(error);
        }
    }).then(() => {
        logMessage('Graphic has Advanced');
    });
}

ccg.animateOut = function() {
    return new Promise((resolve, reject) => {
        try {
            const tl = new TimelineMax({onComplete: resolve, onCompleteParams: [{key: 'text', index}]});
            let width = window.getComputedStyle(document.querySelector('.container'))
                .getPropertyValue('width');
            width = width.substring(0, width.indexOf('px'));

            tl.set(document.querySelectorAll('#main-clip rect'), {attr: {width: '55%'}})
                .set('#subtitle-clip rect', {attr: {width: '110%'}, transformOrigin: 'center center'})
                .set('.name-con', {"clip-path": 'url(#main-clip)'})
                .set('.subtitle', {'clip-path': 'url(#subtitle-clip)'})
                .to('h1', 1, {y: '5vh'})
                .to('#main-clip rect:first-of-type', .5, {x: `-${width / 2 + 10}`}, '-=.75')
                .to('#main-clip rect:last-of-type', .5, {x: width / 2 + 10}, '-=.75')
                .to('.subtitle', .5, {y: '-5vh'}, '-=.5')
                .to('#subtitle-clip rect', 1, {scaleX: 0,ease: Power2.easeInOut}, '-=.25');
        } catch (error) {
            return reject(error);
        }
    }).then(() => {
        logMessage('Graphic has Animated Out');
    });
}
 
ccg.registerCC('reset', function() {
    return new Promise((resolve, reject) => {
        const data = ccg.data();
        if(data.text.length <= 1) return reject('There is only one tag');
        if(index === 1) return reject('Already on the first tag');
        index = 0;
        if(ccg.progress() === 2) {
            resolve();
            return next();
        } else {
            document.querySelector('.tag').style.opacity = 0;
            return ccg.updateElementData(data)
                .then(ccg.setupAnimation)
                .then(() => resolve());
        }   
    }).then(() => {
        logMessage('Graphic has been reset');
    });
});

ccg.registerCC('previousTag', function() {
    const data = ccg.data();
    if(index > 1) {
        index = index - 2;
        return next();
    } else if(data.text.length === 1) {
        return logError(`${data.localName} only has 1 name`);
    } else {
        return logError( `${data.localName} can not go back one name`);
    }
});

ccg.registerCC('nextTag', next);

/*
    Helper Functions
*/

function logMessage(message) {
    DEMO.logMessage(message);
    if(typeof message === 'string') return console.log(message);
}

function logError(message) {
    const parser = new DOMParser();
    const error = parser.parseFromString(message, "text/html");
    DEMO.logMessage(error.querySelector('body').childNodes, true);
    return console.log(message);
}