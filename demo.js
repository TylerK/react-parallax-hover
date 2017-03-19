import React, { Component } from 'react';
import { render } from 'react-dom';
import ParallaxHover from './index';

class ExampleComponent extends Component {
  render() {
    const styles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      color: '#fff',
      height: '100%',
      overflow: 'hidden',
    };

    return (
      <div style={styles}>{this.props.children}</div>
    );
  }
}

class Example extends Component {
  render() {
    const styles = {
      width: '640px',
      height: '200px',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      margin: '0 auto',
    };

    return (
      <div style={styles}>
        <ParallaxHover
          width={200}
          height={200}
          borderRadius={8}
        >
          <ExampleComponent>
            <img width="100%" src="http://www.placecage.com/200/200" />
          </ExampleComponent>
        </ParallaxHover>
        <ParallaxHover
          width={200}
          height={200}
          borderRadius={8}
        >
          <ExampleComponent>
            <img width="100%" src="http://www.placecage.com/220/220" />
          </ExampleComponent>
        </ParallaxHover>
        <ParallaxHover
          width={200}
          height={200}
          borderRadius={8}
        >
          <ExampleComponent>
            <img width="100%" src="http://www.placecage.com/240/240" />
          </ExampleComponent>
        </ParallaxHover>
      </div>
    );
  }
}

render(<Example />, document.getElementById('app'));
