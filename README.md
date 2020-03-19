# CasparCG HTML Template Developer Widget

The CasparCG Widget is a drop in script that creates a small on screen widget which will interact with your HTML Templates. It is written in TypeScript and the converted JS file is called `dev.js` and can be found in the `dist` folder.

Join the discussion on the [CasparCG Forum](https://casparcgforum.org/).

## Features

Change the background color quickly using a color keyword, HEX, RGB or, RGBA values without editing the CSS file.</br>
Set the background to an image using a URL.</br>
Run custom commands (Invoke Command) from the widget.</br>
Easily run the standard Update, Play, Next, and Stop Commands.</br>
Set custom data with a convenient GUI that is injected into the graphic template's update function.</br>
Save multiple data sets for templates that require more than the initial update data. </br>
All data is persistent between page reloads! </br>


## Live Demo

Try the live demo [here](http://www.casparcgwidget.com)!

## Setup

You can load the `dev.js` file directly in your HTML by adding the following line.

```html
<script rel="application/javascript" src="http://yourwebserver/dev.js"></script>
```

Then visit the template's URL with `?debug=true` as the query string. </br>

Example: `http://localhost:3000/html/template.html?debug=true` </br>


## Development Setup

To develop the widget itself, you will need NPM installed and then to follow these two additional steps.

1. Run `npm install` in a command prompt in the root folder of this repo.
2. Run `npm run-script start` to launch the WebPack Dev Server. 

The development server should now be live at `http://localhost:3000`.

### Widget API

The widget offers a full API for interacting with the widget itself. </br>
For the full list, type `_widget.help` into the console.

### Some Images of the Widget for Reference

![Dev Tool Open](Screenshots/CasparCG_HTML_Dev_Widget_Open.jpg)
![Dev Tool Shrunk](Screenshots/CasparCG_HTML_Dev_Widget_Shrunk.jpg)
![Dev Tool Hidden](Screenshots/CasparCG_HTML_Dev_Widget_Hidden.jpg)
![Dev Tool Update Data](Screenshots/CasparCG_HTML_Dev_Widget_Data.jpg)

### A Few Extra Details
This was built for CasparCG version 2.2.0 Stable. </br>
The Chromium version for CasparCG is 63.0.3239.132 and the widget was built in version 63.0.3239.0 which can be found [here](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win_x64/508578/).</br>
Find Chromium download by version [here](https://omahaproxy.appspot.com/). The Branch Base Position is the folder on [this page](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win_x64/).

Please reach out with additions, suggestions, improvements or really anything! 