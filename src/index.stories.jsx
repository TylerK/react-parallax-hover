import React from 'react';
import styled from 'styled-components';
import { ParallaxHover } from './';
import Background from '../assets/background.png';

const ExampleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 30px);
`;

const ImageExample = styled.div`
  height: 100%;
  background-color: tomato;
`;

const TextExample = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-weight: lighter;
  font-size: 3rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  color: #fff;
`;

const CardExample = styled.div`
  width: 220px;
  height: 300px;
  box-shadow: 0 0 0 2px grey;
  background: #eee;
`;

const Container = styled.div`
  padding: 1rem;
  * {
    font-family: sans-serif;
    margin: 0;
  }
`;

const rangeOptions = {
  min: 0,
  max: 9,
  step: 1,
};

const initialValues = {
  radius: 5,
  rotation: 5,
  shine: 5,
  scale: 5,
  shadow: 5,
};

export default {
  title: 'Parallax Hover',
  argTypes: {
    radius: {
      control: {
        type: 'number',
      },
    },
    rotation: {
      control: {
        type: 'range',
        ...rangeOptions,
      },
    },
    shine: {
      control: {
        type: 'range',
        ...rangeOptions,
      },
    },
    scale: {
      control: {
        type: 'range',
        ...rangeOptions,
      },
    },
    shadow: {
      control: {
        type: 'range',
        ...rangeOptions,
      },
    },
  },
};

export const ImageWithText = (args) => {
  return (
    <ExampleWrapper>
      <ParallaxHover
        width={args.width}
        height={args.height}
        borderRadius={args.radius}
        rotation={args.rotation}
        shine={args.shine}
        scale={args.scale}
        shadow={args.shadow}
      >
        <ImageExample>
          <img src={Background} width="500" height="300" alt="Demo image" />
        </ImageExample>
        <TextExample>Hello There</TextExample>
      </ParallaxHover>
    </ExampleWrapper>
  );
};

ImageWithText.args = {
  width: 500,
  height: 300,
  ...initialValues,
};

export const SimpleCard = (args) => {
  return (
    <ExampleWrapper>
      <ParallaxHover
        width={args.width}
        height={args.height}
        borderRadius={args.radius}
        rotation={args.rotation}
        shine={args.shine}
        scale={args.scale}
        shadow={args.shadow}
      >
        <CardExample>
          <img src={Background} width="220" height="220" alt="Demo image" />
          <Container>
            <h3>John Doe</h3>
            <p>Architect &amp; Engineer</p>
          </Container>
        </CardExample>
      </ParallaxHover>
    </ExampleWrapper>
  );
};

SimpleCard.args = {
  width: 220,
  height: 300,
  ...initialValues,
};
