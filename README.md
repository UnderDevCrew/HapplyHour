# HapplyHour app

## Sorry?

HapplyHour is a mobile application which get data about bars and beers around you.
For instence, when you hang out with your friends or your crush, it let you find the nearest bar and see immediately prices and notes.
You can contribute to our database indicating for instance what beers are available in a bar!

## How

This mobile app is built on top of PhoneGap and Polymer.
To get these datas we consume an API (that we are building) which consume the Google Places API to find the bars.

## CONTRIBUTING

First, make sure Phonegap CLI tools are installed on your machine. If not just execute (maybe you will need root privileges) :

```sh
npm install -g phonegap
```

Install the Crosswalk WebView (makes Polymer faster to render) :

```sh
$ phonegap plugin add cordova-plugin-crosswalk-webview
```

Build the app to test it on your browser :

```sh
$ phonegap serve
```
And it should work!

ProTip: `phonegap serve` supports live reloading! Means that you can edit source files and see changes directly on all devices connected to the server ;)


