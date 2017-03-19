#Parallax Hover React Component
Inspired by @drewwilson’s [atvImg](https://github.com/drewwilson/atvImg).

### Install
`npm install react-parallax-hover --save-dev `

### Demo
http://codepen.io/TylerK/full/Gpdqqq

### Usage
```
import ParallaxHover from 'react-parallax-hover';

<ParallaxHover width="500" height="500">
    [...]
</ParallaxHover>
```

### Configuration

**children** <small>(required)</small>
* Type: `Any`

**width** <small>(required)</small>
* Type: `Number`
* Default: `200`

**height** <small>(required)</small>
* Type: `Number`
* Default: `200`

**rotation**
* Type: `Number`
* Range: `1 - 9`
* Default: `5`

**scale**
* Type: `Number`
* Range: `1 - 9`
* Default: `5`

**speed**
TODO

**borderRadius**
* Type: `Number` in pixels
* Default: `0`

### Run the example locally
```
git clone https://github.com/tylerk/react-parallax-hover/
cd react-parallax-hover
npm install
npm start
```
