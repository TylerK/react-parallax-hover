# Parallax Hover React Component
Inspired by Apple TV's glorious overlay effects, and @drewwilson’s [atvImg](https://github.com/drewwilson/atvImg) plugin. 

`react-parallax-hover` supports configuration options, and multiple layers. 

# Install
`npm install react-parallax-hover --save-dev `

# Demo
http://codepen.io/TylerK/full/Gpdqqq

# Usage
```
import ParallaxHover from 'react-parallax-hover';

<ParallaxHover width={500} height={500}>
    [...]
</ParallaxHover>
```

# Configuration

**children** `required`
* Type: `Any`

Component will accept a single child, or a flat array of children. 

> Note: While this will 'layer' the parallax effect per-child, you will typiclaly see diminishing returns after two or three components.

---

**width** `required`
* Type: `Number`
* Default: `200`

> Note: Currently does not accept a percentage, or relative height 

---

**height** <small>(required)</small>
* Type: `Number`
* Default: `200`

> Note: Currently does not accept a percentage, or relative height 

---

**rotation**
> blah blah 

* Type: `Number`
* Range: `0 - 9`
* Default: `5`

Adjust the exaggeration of the rotation on pointer move.

---

**shadow**
* Type: `Number`
* Range: `0 - 9`
* Default: `5`

Adjusts the darkness of the shadow. 

---

**scale**
* Type: `Number`
* Range: `1 - 9`
* Default: `5`

Adjusts how large the component will grow. 

---

**speed**
* TODO

---

**borderRadius**
* Type: `Number` in pixels
* Default: `0`

---

### Run the example locally
```
git clone https://github.com/tylerk/react-parallax-hover/
cd react-parallax-hover
npm install
npm start
```
