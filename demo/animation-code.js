'use strict';

const ENV = 'DEV';

// Change DEV_SCRIPT_URL to the url the dev.js script will be served from 
const DEV_SCRIPT_URL = 'http://localhost:3000/dev.js';

// Loads the dev script
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

// The index of data to show
let index = 0;

//  The timeline position
// tlprogress = 0 -> Template needs to be loaded
// tlprogress = 1 -> Template has been loaded, needs to be played
// tl progress = 2 -> Template has been played, needs to be stopped or advanced
// tlprogress = 3 -> Template has been stopped, needs to be played
let tlprogress = 0,
//  Info about the template
    templateInfo = {};

// Promise that waits for all the template style and text data to be set
function setTemplateData() {
    return new Promise((resolve, reject) => {
        Promise.all([setUpStyles(), setUpTexts()])
        .then(() => {
            index++;
            return resolve();
        })
        .catch(error => reject(error));
    })
    
}

// Set all gthe templates styles
function setUpStyles() {
    return new Promise((resolve, reject) => {
       try {
            const h1 = document.querySelector('h1'),
                p = document.querySelector('p'),
                tag = document.querySelector('.tag'),
                nameBKG = document.querySelector('.name-bkg'),
                subtitle = document.querySelector('.subtitle');

            h1.style.color = templateInfo.style.textColor;
            p.style.color = templateInfo.style.textColor;
            nameBKG.style.stroke = templateInfo.style.primaryColor;
            subtitle.style.backgroundColor = templateInfo.style.primaryColor;

            switch(templateInfo.style.position) {
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
           return reject(`${templateInfo.name} failed to set it's styles`);
       }
    });
}

// Sets all the templates element's text
function setUpTexts() {
    return new Promise((resolve, reject) => {
        try {
            if(index <= templateInfo.text.length - 1) {
                const name = templateInfo.text[index].name,
                    h1 = document.querySelector('h1'),
                    span = document.createElement('span'),
                    p = document.querySelector('p');
        
                h1.textContent = name.substring(0, name.indexOf(' '));
                span.textContent = name.substring(name.indexOf(' '));
                h1.appendChild(span);
                p.textContent = templateInfo.text[index].title;
    
                return resolve();
            } else {
                return reject(`${templateInfo.name} is out of names to display (${templateInfo.text.length})`);
            }
        } catch (error) {
            return reject(`${templateInfo.name} had an issue settings it's texts. ${error}`)
        }
    });
}

// Sets the Elements initial state
function setTemplateElements() {
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
            return reject(`${templateInfo.name} had an error setting template elements. ${error}`);
        }
    });
}

// The template's update function that is responsible for all the setup
// @param {string} rawData - Raw JSON to be parsed and used to setup the graphic
function update(rawData) {
    let data;
    if(!rawData) return logError('Template requires data.');
    try {
        data = JSON.parse(rawData);
    } catch(e) {
        return logError('Cannot parse JSON');
    }
    // Template requires data when updating
    if(!data || !Object.keys(data).length || data.noData) {
        return console.error('Template required data')
    // If the data being sent is load data
    } else {
        templateInfo = data;
        if(tlprogress === 0) {
            setTemplateData()
            .then(setTemplateElements)
            .then(() => {
                tlprogress = 1;
                logMessage(`${templateInfo.name} has loaded. (updated)`);
                if(templateInfo.playoutInfo.playOnLoad) return play();
            }).catch(error => logError(error));
        } else {
            index--;
            setTemplateData().then(() => {
                logMessage(`${templateInfo.name} has been Updated`);
            });
        }
       
        
    }
}

// Animates in the graphic
function play() {
    if(tlprogress === 0) {
        return logError("Run the <span class='update'>Update</span> command with some data to load the graphic");
    } else if(tlprogress === 2) {
        return logError('The graphic needs to be <span class="next">Advanced</span> or <span class="stop">Stopped</span>')
    }
    animateIn().then(() => {
        tlprogress = 2;
        logMessage(`${templateInfo.name} has animated in.`);
    });
}

// Advances the graphic
function next() {
    if(tlprogress === 0) {
        return logError("Run the <span class='update'>Update</span> command with some data to load the graphic");
    } else if(tlprogress === 1 || tlprogress === 3) {
        return logError('The graphic needs to be <span class="play">Played</span>');
    }
    if(index > templateInfo.text.length - 1) 
        return logError(`${templateInfo.name} is out of names to show and should be <span class="stop">Stopped</span>`);
    logMessage(`${templateInfo.name} is Advancing to show ${templateInfo.text[index].name} ${index + 1} of ${templateInfo.text.length}`);
    return animateTemplateOut()
        .then(setUpTexts)
        .then(animateTemplateIn)
        .then(() => {
            index++;
            return logMessage(`${templateInfo.name} has Advanced.`);
        })
        .catch(error => reject(`${templateInfo.name} had an issue while advancing. ${error}`));
}

// Animates the graphic out
function stop() {
    if(tlprogress === 0) {
        return logError("Run the <span class='update'>Update</span> command with some data to load the graphic");
    } else if(tlprogress === 1 || tlprogress === 3) {
        return logError('The graphic needs to be <span class="play">Played</span>');
    }
    animateOut().then(() => {
        tlprogress = 3;
        logMessage(`${templateInfo.name} has animated out.`);
    });
}

function animateIn() {
    return new Promise((resolve, reject) => {
        try {
            const tl = new TimelineMax({onComplete: resolve});

            tl.to('#subtitle-clip rect', 1, {scaleX: 1,ease: Power2.easeInOut})
                .to('.subtitle', .5, {y: 0,ease: Power2.easeInOut}, '-=.25')
                .to(document.querySelectorAll('#main-clip rect'), 1, {x: 0,ease: Power2.easeInOut}, '-=.5')
                .to('h1', .5, {y: 0,ease: Power2.easeOut}, '-=.5')
                .set(['.name-con', '.subtitle'], {"clip-path": 'none'});
        } catch (error) {
            return reject(`${templateInfo.name} had an error while ANIMATING IN. ${error}`);
        }
   });
}

 const animateTemplateOut = () => {
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
             return reject(`${templateInfo.name} had an issue while ADVANCING (Out). ${error}`);
         }
     });
 }
 
 const animateTemplateIn = () => {
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
             return reject(`${templateInfo.name} had an issue while ADVANCING (In). ${error}`);
         }
     });
 }

 function animateOut() {
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
            return reject(`${templateInfo.name} had an error while ANIMATING OUT. ${error}`);
        }
    });
 }
 
 // Custom Command - Reset - Resets the tag to the first one given on load
 function reset() {
     if(templateInfo.text.length <= 1) 
         return logError(`${templateInfo.name} does not have more than one name`);
     index = 0;
     if(tlprogress === 2) {
         return next();
     } else {
         document.querySelector('.tag').style.opacity = 0;
         return setTemplateData()
             .then(setTemplateElements)
             .then(() => logMessage(`${templateInfo.name} has reset and is now showing ${templateInfo.text[index - 1].name} [${index} of ${templateInfo.text.length}]`))
     }   
 }
 
 // Custom Command - Previous Tag - Goes to the previous name if possible
 function previousTag() {
     if(tlprogress === 0) {
        return logError("Run the <span class='update'>Update</span> command with some data to load the graphic"); 
     }
     if(index > 1) {
         index = index - 2;
         tlprogress = 2;
         return next();
     } else if(templateInfo.text.length === 1) {
         return logError(`${templateInfo.name} only has 1 name`);
     } else {
         return logError( `${templateInfo.name} can not go back one name`);
     }
 }
 
 // Custom Command - Next Tag - Goes to the next name if possible
 function nextTag() {
     return next();
 }

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