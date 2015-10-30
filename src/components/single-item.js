import React from 'react';
import config from '../utils/config';

export default class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <figure class='ph-image'>
        <div class='ph-shadow'></div>
        <div class='ph-layers'>
          {this.props.children}
        </div>
        <div class='ph-lighting'></div>
      </figure>
    );
  }
}
