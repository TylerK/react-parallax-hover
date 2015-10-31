import React from 'react';
import ReactDom from 'react-dom';
import { ParallaxHover } from './parallax-hover';
import './index.scss';

class App extends React.Component {
  render() {
    return (
      <ParallaxHover>
        <img src='http://i.imgur.com/My2MGzx.jpg' />
      </ParallaxHover>
    );
  }
}

const Node = document.getElementById('app');
ReactDom.render(React.createElement(App), Node);
