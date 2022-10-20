# Three Screen App!

## Screens

### Screen 1

The first screen is a simple calculator. It supports standard math syntax, and some trig operations as well.
It also has a built in dar/light theme switcher (the button in the top left)!

### Screen 2

The second screen shows your current location on a map.

### Screen 3

The third screen is a real time social recognition program, which uses your webcam and tracks your face!.



## Installing

If you wish to run this app yourself, either download the prebuilt .apk from the releases section,
or read the build instructions in the build section.



## Building

### Dependencies

Please make sure that nodejs and npm are accessable from your terminal.

### Getting the code

Download the code from github:
```bash
git clone https://github.com/KCGD/threeScreenApp.git
cd threeScreenApp
```

Install the required submodules
```bash
cd ./assets
git clone https://github.com/WebDevSimplified/Face-Detection-JavaScript.git
cd ..
```

Install node modules
```bash
npm i
```

Build the app
```bash
npx run build
```

This will output a .apk file in the dist folder.