import React from 'react';
import ReactDom from 'react-dom';
import ParallaxHover from './parallax-hover';
import './index.scss';

const App = React.createClass({
  render() {
    return (
      <div>
        <ParallaxHover>
          <img src='http://i.imgur.com/My2MGzx.jpg' />
        </ParallaxHover>
      </div>
    );
  }
});

const Node = document.getElementById('app');
ReactDom.render(React.createElement(App), Node);
