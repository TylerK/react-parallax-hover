import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ParallaxWrapper = styled.div`
  position: relative;
`;

const ParallaxShadow = styled.div`
  position: absolute;
  width: 95%;
  height: 95%;
  left: 2.55%;
  top: 2.55%;
  background: none;
`;

const ParallaxLayer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ParallaxLighting = styled(ParallaxLayer)`
  opacity: 0;
`;

const initialState = {
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  shine: 0,
  isHovered: false,
};

export class ParallaxHover extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  buildTransitionTimingString = (depth = 0) => {
    const START_SPEED = 160;
    const MAX_SPEED = 260;
    const DEPTH_MODIFIER = 15;
    let speedModifier;

    if (depth > 0) {
      speedModifier = START_SPEED + depth * DEPTH_MODIFIER;
    } else if (depth > 10) {
      speedModifier = MAX_SPEED;
    }

    return { transition: `all ${speedModifier}ms ease-out` };
  };

  buildTransformStrings(depth = 0) {
    const { isHovered, rotateX, rotateY, scale } = this.state;

    const scaleModifier = isHovered ? 1 + scale / 100 : 1;
    const rotationXModifier = Math.floor(rotateX / depth);
    const rotationYModifier = Math.floor(rotateY / depth);

    const transformString = `perspective(1000px) scale(${scaleModifier}) rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`;

    return {
      WebkitTransform: transformString,
      MozTransform: transformString,
      MsTransform: transformString,
      OTransform: transformString,
      transform: transformString,
    };
  }

  calculateDistance(bounds, offsetX, offsetY) {
    const distanceX = Math.pow(offsetX - bounds.width / 2, 2);
    const distanceY = Math.pow(offsetY - bounds.height / 2, 2);
    return Math.floor(Math.sqrt(distanceX + distanceY));
  }

  calculateShineFromCenter(current) {
    const { width, height, shine } = this.props;
    const max = Math.max(width, height);
    return (current / max) * shine;
  }

  handleParallaxBegin = () => {
    this.setState({
      isHovered: true,
      shine: this.props.shine,
    });
  };

  handleParallaxEnd = () => {
    this.setState(initialState);
  };

  handleParallaxMove = ({ pageX, pageY }) => {
    const { width, height, rotation, scale } = this.props;
    const { scrollY: scrollTop, scrollX: scrollLeft } = window;

    const bounds = this.wrapper.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const widthMultiplier = 360 / width;
    const offsetX = (pageX - bounds.left - scrollLeft) / width;
    const offsetY = (pageY - bounds.top - scrollTop) / height;
    const deltaX = pageX - bounds.left - scrollLeft - centerX;
    const deltaY = pageY - bounds.top - scrollTop - centerY;

    const rotateX = (deltaY - offsetY) * ((rotation / 100) * widthMultiplier);
    const rotateY = (offsetX - deltaX) * ((rotation / 100) * widthMultiplier);

    const angleRad = Math.atan2(deltaY, deltaX);
    const angleRaw = (angleRad * 180) / Math.PI - 90;
    const angle = angleRaw < 0 ? angleRaw + 360 : angleRaw;

    this.setState({
      angle,
      rotateX,
      rotateY,
      scale,
    });
  };

  renderLayers() {
    const { borderRadius, children, height, width } = this.props;

    const style = depth => ({
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: `${borderRadius}px`,
      ...this.buildTransitionTimingString(depth),
      ...this.buildTransformStrings(depth),
    });

    if (!Array.isArray(children)) {
      return (
        <ParallaxLayer style={style(1)} className="parallaxHover__layer">
          {children}
        </ParallaxLayer>
      );
    }

    return children.map((layer, i) => {
      return (
        <ParallaxLayer style={style(i + 2)} className="parallaxHover__layer" key={i}>
          {layer}
        </ParallaxLayer>
      );
    });
  }

  render() {
    const { angle, isHovered, shine, rotateX } = this.state;
    const { children, borderRadius, shadow, width, height } = this.props;

    const shadowPositionModifier = rotateX + (shadow * shadow) / 2;
    const shadowBlurModifier = shadow * 20;
    const opacityModifier = isHovered ? 1 : 0;
    const lightingShineModifier = shine * 0.1;

    const wrapperStyles = {
      ...this.buildTransitionTimingString(1),
      width,
      height,
    };

    // prettier-ignore
    const shadowStyles = {
      ...this.buildTransitionTimingString(2),
      borderRadius: borderRadius + 'px',
      opacity: opacityModifier,
      boxShadow: `
        0px ${shadowPositionModifier}px ${shadowBlurModifier}px rgba(0, 0, 0, 0.5),
        0px ${shadowPositionModifier * 0.33}px ${shadowBlurModifier * 0.33}px 5px rgba(0, 0, 0, 0.5)`,
    };

    const lightingStyles = {
      ...this.buildTransitionTimingString(children.length),
      ...this.buildTransformStrings(children.length),
      borderRadius: borderRadius + 'px',
      opacity: opacityModifier,
      backgroundImage: `linear-gradient(${angle}deg, rgba(255,255,255, ${lightingShineModifier}) 0%, rgba(255,255,255,0) 80%)`,
    };

    return (
      <ParallaxWrapper
        className="parallaxHover__outter"
        onMouseEnter={this.handleParallaxBegin}
        onMouseLeave={this.handleParallaxEnd}
        onMouseMove={this.handleParallaxMove}
        onTouchStart={this.handleParallaxBegin}
        onTouchMove={this.handleParallaxEnd}
        onTouchEnd={this.handleParallaxMove}
        style={wrapperStyles}
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        <ParallaxShadow className="parallaxHover__shadow" style={shadowStyles} />
        {this.renderLayers()}
        <ParallaxLighting className="parallaxHover__lighting" style={lightingStyles} />
      </ParallaxWrapper>
    );
  }
}

ParallaxHover.defaultProps = {
  /** How fast the item scales up and down in MS */
  speed: 100,
  /** How large to scale the item */
  scale: 6,
  /** Rotation modifier */
  rotation: 8,
  /** Shadow darkness modifier */
  shadow: 5,
  /** Light shine brightness modifer */
  shine: 5,
  /** Default height */
  height: 200,
  /** Default width */
  width: 200,
  /** Default border radius */
  borderRadius: 0,
};

ParallaxHover.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shadow: PropTypes.number,
  scale: PropTypes.number,
  rotation: PropTypes.number,
  shine: PropTypes.number,
  borderRadius: PropTypes.number,
};

export default ParallaxHover;
