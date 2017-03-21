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
      width: '700px',
      height: '200px',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      margin: '0 auto',
    };

    return (
      <div style={styles}>
        <div>
          <ParallaxHover
            width={200}
            height={200}
            borderRadius={0}
            rotation={5}
            shine={5}
            shadow={5}
          >
            <ExampleComponent>
              <img src="http://lorempixel.com/200/200/" alt=""/>
            </ExampleComponent>
          </ParallaxHover>

          <div style={{ margin: '30px 0' }}>
            <pre>
              <code>
                borderRadius={0}<br/>
                rotation={5}<br/>
                shine={5}<br/>
                shadow={5}<br/>
              </code>
            </pre>
          </div>
        </div>

        <div>
          <ParallaxHover
            width={200}
            height={200}
            borderRadius={5}
            rotation={9}
            shine={3}
            shadow={9}
            scale={9}
          >
            <ExampleComponent>
              <img src="http://lorempixel.com/220/220/" alt=""/>
            </ExampleComponent>

          </ParallaxHover>
          <div style={{ margin: '30px 0' }}>
            <pre>
              <code>
                borderRadius={5}<br/>
                rotation={9}<br/>
                shine={3}<br/>
                shadow={10}<br/>
                scale={8}<br/>
              </code>
            </pre>
          </div>
        </div>


        <div>
          <ParallaxHover
            width={200}
            height={200}
            borderRadius={999}
            rotation={5}
            shine={3}
            shadow={3}
            scale={3}
          >
            <ExampleComponent>
              <img src="http://lorempixel.com/240/240/" alt=""/>
            </ExampleComponent>
          </ParallaxHover>

          <div style={{ margin: '30px 0' }}>
            <pre>
              <code>
                borderRadius={999}<br/>
                rotation={5}<br/>
                shine={3}<br/>
                shadow={9}<br/>
                scale={3}<br/>
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

render(<Example />, document.getElementById('app'));
