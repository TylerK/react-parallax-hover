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
      fontSize: '2rem',
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
          borderRadius={10}
          rotation={3}
          shine={3}
        >
          <ExampleComponent>
            <img src="http://lorempixel.com/200/200/" alt=""/>
          </ExampleComponent>
        </ParallaxHover>

        <ParallaxHover
          width={200}
          height={200}
          rotation={9}
        >
          <ExampleComponent>
            <img src="http://lorempixel.com/220/220/" alt=""/>
          </ExampleComponent>
        </ParallaxHover>

        <ParallaxHover
          width={200}
          height={200}
          borderRadius={33}
          shine={9}
        >
          <ExampleComponent>
            <img src="http://lorempixel.com/240/240/" alt=""/>
          </ExampleComponent>
        </ParallaxHover>
      </div>
    );
  }
}

render(<Example />, document.getElementById('app'));
