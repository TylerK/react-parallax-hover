# Parallax Hover React Component

Inspired by Apple TV's glorious overlay effects, and the amazing talented [@drewwilson’s](http://drewwilson.com/) [atvImg](https://github.com/drewwilson/atvImg) plugin.

# Demo

https://tylerk.gihub.io/react-parallax-hover/

# Install

```
$ yarn add react-parallax-hover
- or -
$ npm install react-parallax-hover
```

# Usage

```
import { ParallaxHover } from 'react-parallax-hover';

<ParallaxHover width={500} height={500}>
    ...
</ParallaxHover>
```

# Configuration

**children** `required`

- Type: `Any`

Component will accept a single child, or a flat array of children.

> Note: While this will 'layer' the parallax effect per-child, you will typiclaly see diminishing returns after two or three components.

---

**width** `required`

- Type: `Number`
- Default: `200`

> Note: Currently does not accept a percentage, or relative height

---

**height** `required`

- Type: `Number`
- Default: `200`

> Note: Currently does not accept a percentage, or relative height

---

**rotation**

- Type: `Number`
- Range: `0 - 9`
- Default: `5`

Adjust the exaggeration of the rotation on pointer move.

---

**shadow**

- Type: `Number`
- Range: `0 - 9`
- Default: `5`

Adjusts the darkness of the shadow.

---

**borderRadius**

- Type: `Number` in pixels
- Default: `0`

---

### Run the example locally

```
$ git clone https://github.com/tylerk/react-parallax-hover/
$ cd react-parallax-hover
$ yarn
$ yarn start
```
