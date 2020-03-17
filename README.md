# React Parallax Hover

This is a 4kb (gzipped) component inspired by Apple TV's beautiful overlay effects, and the amazingly talented [@drewwilson’s](http://drewwilson.com/) [atvImg](https://github.com/drewwilson/atvImg) work.

# Demo

https://tylerk.github.io/react-parallax-hover/

# Install

You will need the following versions listed as a dependency in your project:

- `react @ 16.8.x`
- `react-dom @ 16.8.x`

Install:

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

# Options

### `children`

- Required: `true`
- Type: `Any`

Component will accept a single child, or a flat array of children.

> Note: While this will 'layer' the parallax effect per-child, you will typiclaly see diminishing returns after two or three components.

---

### `width`

- Required: `true`
- Type: `number`
- Default: `200`

> Note: Currently only accepts values to be used as pixels. This component does not accept percentages, em, rem, etc...

---

### `height`

- Required: `true`
- Type: `number`
- Default: `200`

> Note: Currently does not accept a percentage, or relative height

---

### `rotation`

- Type: `number`
- Range: `0 - 9`
- Default: `5`

Adjust the exaggeration of the rotation on pointer move.

---

### `shadow`

- Type: `number`
- Range: `0 - 9`
- Default: `5`

Adjusts the darkness of the shadow.

---

### `borderRadius`

- Type: `number` in pixels
- Default: `0`

---

# How To Contribute

Run the following after forking this repo:

```
$ git clone https://github.com/<your username>/react-parallax-hover/
$ cd react-parallax-hover
$ yarn
$ yarn start
```

You should see a Storybook instance open up in your default browser.

Happy hacking, and feel free to issue PR's against this repo.
