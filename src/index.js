import React from 'react';
import ReactDom from 'react-dom';
import SingleItem from './components/single-item';

const Node = document.getElementById('app');

class App extends React.Component {
  render() {
    return (
      <SingleItem>
        <img src='http://i.imgur.com/My2MGzx.jpg' />
      </SingleItem>
    );
  }
}

ReactDom.render(React.createElement(App), Node);
