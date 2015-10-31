import React from 'react';

class ParallaxHover extends React.Component {
  static propTypes() {
    return {
      children: React.Proptypes.node.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <figure className='ph-wrapper'>
        <div className='ph-shadow'></div>
        <div className='ph-layers'>
          {this.props.children}
        </div>
        <div className='ph-lighting'></div>
      </figure>
    );
  }
}

export default ParallaxHover;
