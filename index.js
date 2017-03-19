import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const baseStyles = {
  layers: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
};

const styles = StyleSheet.create({
  outter: {
    transformStyle: 'preserve-3d'
  },
  wrapper: {
    position: 'relative',
    margin: 0,
    padding: 0,
    transition: 'all 180ms ease-in-out',
  },
  shadow: {
    background: 'rgba(0, 0, 0, 0.2)',
    ...baseStyles.layers,
    filter: 'blur(3px)',
    width: '80%',
    height: '80%',
    left: '10%',
    top: '10%',
    transition: 'all 180ms ease-in-out',
  },
  layers: {
    ...baseStyles.layers
  },
  layer: {
    ...baseStyles.layers,
    overflow: 'hidden',
  },
  lighting: {
    opacity: 0,
    ...baseStyles.layers,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '5rem',
  },
});

const initialState = {
  rotateX: 0,
  rotateY: 0,
  shadowMovement: 0,
  shadowSize: 0,
  scale: 1,
  shine: 0,
  isScaling: false,
};

export default class ParallaxHover extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  buildTransformStrings(depth = 1) {
    const { scale, rotateX, rotateY } = this.state;

    const scaleModifier = 1 + (scale / 100);
    const rotationXModifier = rotateX + depth;
    const rotationYModifier = rotateY + depth;

    return {
      WebkitTransform: `perspective(1000px) scale(${scaleModifier}) rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`,
      MozTransform: `perspective(1000px) scale(${scaleModifier}) rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`,
      transform: `perspective(1000px) scale(${scaleModifier}) rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`
    };
  }

  calculateDistance(bounds, offsetX, offsetY) {
    const distanceX = Math.pow(offsetX - (bounds.width / 2), 2);
    const distanceY = Math.pow(offsetY - (bounds.height / 2), 2);
    return Math.floor(Math.sqrt(distanceX + distanceY));
  }

  calculateShineFromCenter(current) {
    const { width, height, shine } = this.props;
    const max = Math.max(width, height);
    return current / max * shine;
  }

  handleParallaxEnd = () => {
    this.setState(initialState);
  }

  handleParallaxMove = ({ pageX, pageY }) => {
    const { width, height, rotation, scale } = this.props;
    const { scrollTop, scrollLeft } = document.body;

    const bounds = this.wrapper.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const widthMultiplier = 320 / width;
    const offsetX = (pageX - bounds.left - scrollLeft) / width;
    const offsetY = (pageY - bounds.top - scrollTop) / height;
    const deltaX = (pageX - bounds.left - scrollLeft) - centerX;
    const deltaY = (pageY - bounds.top - scrollTop) - centerY;

    const rotateX = (deltaY - offsetY) * ((rotation / 100) * widthMultiplier);
    const rotateY = (offsetX - deltaX) * ((rotation / 100) * widthMultiplier);

    const angleRad = Math.atan2(deltaY, deltaX);
    const angleRaw = angleRad * 180 / Math.PI - 90;
    const angle = angleRaw < 0 ? angleRaw + 360 : angleRaw;
    const distanceFromCenter = this.calculateDistance(bounds, offsetX, offsetY);
    const shadowMovement = centerY * 0.25;
    const shadowSize = 120;

    const shine = this.calculateShineFromCenter(distanceFromCenter);

    this.setState({
      angle,
      rotateX,
      rotateY,
      scale,
      shadowMovement,
      shadowSize,
      shine,
    });
  }

  renderLayers() {
    const { borderRadius, children } = this.props;

    if (!Array.isArray(children)) {
      const _styles = {
        ...this.buildTransformStrings(),
        borderRadius: `${borderRadius}px`
      };

      return (
        <div style={_styles} className={css(styles.layer)}>{children}</div>
      );
    }

    return children.map((layer, key) => {
      const depth = key + 0.1;
      const _styles = {
        ...this.buildTransformStrings(depth),
        borderRadius: `${borderRadius}px`
      };
      return <div style={_styles} className={css(styles.layer)} key={key}>{layer}</div>;
    });
  }

  render() {
    const { angle, shine, shadowMovement, shadowSize } = this.state;
    const { borderRadius, width, height } = this.props;

    console.log(this.state);

    // Styles that need to be recalculated on render
    // Or passed in from props
    const _styles = {
      lighting: {
        backgroundImage: `linear-gradient(${angle}deg, rgba(255,255,255, ${(shine / 10)}) 0%, rgba(255,255,255,0) 40%)`,
        borderRadius: `${borderRadius}px`,
        opacity: '1',
        ...this.buildTransformStrings(),
      },

      shadow: {
        boxShadow: `0px ${shadowMovement}px ${shadowSize}px rgba(0, 0, 0, 0.6)`,
        borderRadius: `${borderRadius}px`,
        ...this.buildTransformStrings(),
      },

      wrapper: {
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: `${borderRadius}px`,
        ...this.buildTransformStrings(),
      },
    };

    return (
       <div className={css(styles.outter)}>
        <div
          className={css(styles.wrapper)}
          style={_styles.wrapper}
          onMouseEnter={this.handleParallaxBegin}
          onMouseLeave={this.handleParallaxEnd}
          onMouseMove={this.handleParallaxMove}
          onTouchStart={this.handleParallaxBegin}
          onTouchMove={this.handleParallaxMove}
          onTouchEnd={this.handleParallaxEnd}
          ref={(wrapper) => { this.wrapper = wrapper; }}
        >
          <div className={css(styles.shadow)} style={_styles.shadow} />
          <div className={css(styles.layers)}>
            { this.renderLayers() }
          </div>
          <div className={css(styles.lighting)} style={_styles.lighting} />
        </div>
      </div>
    );
  }
}

ParallaxHover.defaultProps = {
  speed: 100,     // How fast the item scales up and down in MS
  scale: 5,       // How large to scale the item
  rotation: 6,    // Rotation modifier
  shine: 5,       // Light shine brightness modifer
  height: 200,    // Default height
  width: 200,     // Default width
};

ParallaxHover.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  // Optional Proptypes
  speed: PropTypes.number,
  scale: PropTypes.number,
  rotation: PropTypes.number,
  shine: PropTypes.number,
  borderRadius: PropTypes.number,
};
