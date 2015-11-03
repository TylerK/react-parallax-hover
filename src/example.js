import React from 'react';
import ReactDom from 'react-dom';
import ParallaxHover from './parallax-hover';

const App = React.createClass({
  render() {
    return (
      <ParallaxHover width='500' height='500'>
        <img ref='image' src='http://i.imgur.com/My2MGzx.jpg' />
        <div ref='text'>Test Hover Text</div>
      </ParallaxHover>
    );
  }
});

const Node = document.getElementById('app');
ReactDom.render(React.createElement(App), Node);
