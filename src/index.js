import React from 'react';
import ReactDom from 'react-dom';
import ParallaxHover from './parallax-hover';

import './index.scss';

const App = React.createClass({
  render() {
    return (
      <div>
        <ParallaxHover width='500' height='500'>
          <img ref='image' src='http://i.imgur.com/My2MGzx.jpg' />
          <h1 ref='text'>Test Hover Text</h1>
        </ParallaxHover>
      </div>
    );
  }
});

const Node = document.getElementById('app');
ReactDom.render(React.createElement(App), Node);
