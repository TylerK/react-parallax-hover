#Parallax Hover React Component
Inspired by @drewwilson’s [atvImg](https://github.com/drewwilson/atvImg), ported to React. Allows for non image based layers. Currently only supports mouse events. 

Pull requests and suggestions more than welcome :]

### Install
`npm install --save react-parallax-hover`

### Run the example locally
```
git clone https://github.com/tylerk/react-parallax-hover/
cd react-parallax-hover
npm install
npm start
```

### Usage
```
import ParallaxHover from 'react-parallax-hover';
import 'react-parallax-hover/index.css';

<ParallaxHover width='500' height='500'>
    <img ref='image' src='...' />
    <h1 ref='text'>Some text</h1>
</ParallaxHover>
```

### TODOs
- [ ] More robust configuration
- [ ] Touch event handling
- [ ] Github pages site with examples and demo's
- [ ] Animated gif hotness for this readme
