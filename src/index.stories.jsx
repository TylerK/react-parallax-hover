import React from 'react';
import styled from 'styled-components';
import { withKnobs, number } from '@storybook/addon-knobs';
import { ParallaxHover } from './';

const ExampleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 30px);
`;

const TextExample = styled.div`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 2rem;
  color: #fff;
`;

export default { title: 'Parallax Hover', decorators: [withKnobs] };

export const kitchenSink = () => {
  return (
    <ExampleWrapper>
      <ParallaxHover
        width={number('Width', 500)}
        height={number('Height', 300)}
        borderRadius={number('Border Radius', 12)}
        rotation={number('Rotation Amount', 3)}
        shine={number('Light Shine', 2)}
        shadow={number('Shadow Depth', 3)}
      >
        <img src="http://placekitten.com/500/300/" alt="Demo image" />
        <TextExample>Hello There</TextExample>
      </ParallaxHover>
    </ExampleWrapper>
  );
};
