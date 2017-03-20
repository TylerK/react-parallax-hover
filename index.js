import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const baseStyles = {
  transition: {
    transition: 'all 222ms ease-out',
  },
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
  parallaxHover__outter: {
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'visible',
    ...baseStyles.transition,
  },
  parallaxHover__wrapper: {
    overflow: 'hidden',
    ...baseStyles.layers,
  },
  parallaxHover__shadow: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    left: '10%',
    top: '10%',
  },
  parallaxHover__layer: {
    overflow: 'hidden',
    ...baseStyles.layers,
  },
  parallaxHover__lighting: {
    ...baseStyles.layers,
  },
});

const initialState = {
  rotateX: 0,
  rotateY: 0,
  shadowMovement: 0,
  shadowSize: 0,
  scale: 1,
  shine: 0,
  isHovered: false,
};

export default class ParallaxHover extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    const { shine } = this.props;
    this.setState({ shine });
  }

  buildTransformStrings(depth = 0) {
    const { rotateX, rotateY } = this.state;

    const rotationXModifier = rotateX + depth;
    const rotationYModifier = rotateY + depth;

    return {
      WebkitTransform: `rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`,
      MozTransform: `rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`,
      transform: `rotateX(${rotationXModifier}deg) rotateY(${rotationYModifier}deg)`
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

  handleParallaxBegin = () => {
    this.setState({
      isHovered: true,
      shine: this.props.shine,
    });
  }

  handleParallaxEnd = () => {
    this.setState(initialState);
  }

  handleParallaxMove = ({ pageX, pageY }) => {
    const { width, height, rotation, scale } = this.props;
    const { scrollY: scrollTop, scrollX: scrollLeft } = window;

    if (!this.state.isHovered) this.setState({ isHovered: true });

    const bounds = this.wrapper.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const widthMultiplier = 360 / width;
    const offsetX = (pageX - bounds.left - scrollLeft) / width;
    const offsetY = (pageY - bounds.top - scrollTop) / height;
    const deltaX = (pageX - bounds.left - scrollLeft) - centerX;
    const deltaY = (pageY - bounds.top - scrollTop) - centerY;

    const rotateX = (deltaY - offsetY) * ((rotation / 100) * widthMultiplier);
    const rotateY = (offsetX - deltaX) * ((rotation / 100) * widthMultiplier);

    const angleRad = Math.atan2(deltaY, deltaX);
    const angleRaw = angleRad * 180 / Math.PI - 90;
    const angle = angleRaw < 0 ? angleRaw + 360 : angleRaw;
    const shadowMovement = centerY * 0.25;
    const shadowSize = 110;

    this.setState({
      angle,
      rotateX,
      rotateY,
      scale,
      shadowMovement,
      shadowSize,
    });
  }

  renderLayers() {
    const { borderRadius, children } = this.props;
    const _styles = {
      borderRadius: `${borderRadius}px`,
      ...this.buildTransformStrings(),
    };

    if (!Array.isArray(children)) {
      return (
        <div
          style={_styles}
          className={css(styles.parallaxHover__layer)}
        >
          {children}
        </div>
      );
    }

    return children.map((layer, key) => {
      return (
        <div
          style={_styles}
          className={css(styles.parallaxHover__layer)}
          key={key}
        >
          {layer}
        </div>
      );
    });
  }

  render() {
    const { angle, isHovered, scale, shadowMovement, shadowSize, shine } = this.state;
    const { borderRadius, width, height } = this.props;

    const scaleModifier = isHovered ? (1 + scale / 50) : 1;

    // Styles that need to be recalculated on render or passed in from props
    const _styles = {
      overlay: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${scaleModifier}) perspective(1000px)`
      },
      wrapper: {
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: `${borderRadius}px`,
        ...this.buildTransformStrings(),
      },
      lighting: {
        backgroundImage: `linear-gradient(${angle}deg, rgba(255,255,255, ${shine / 10}) 0%, rgba(255,255,255,0) 50%)`,
        borderRadius: `${borderRadius}px`,
        ...this.buildTransformStrings(),
      },
      shadow: {
        borderRadius: `${borderRadius}px`,
        boxShadow: `0px ${shadowMovement}px ${shadowSize}px rgba(0, 0, 0, 0.5)`,
        ...this.buildTransformStrings(),
      },
    };

    return (
      <div
        className={css(styles.parallaxHover__outter)}
        onMouseEnter={this.handleParallaxBegin}
        onMouseLeave={this.handleParallaxEnd}
        onMouseMove={this.handleParallaxMove}
        onTouchStart={this.handleParallaxBegin}
        onTouchMove={this.handleParallaxEnd}
        onTouchEnd={this.handleParallaxMove}
        style={_styles.overlay}
      >
        <div className={css(styles.parallaxHover__shadow)} style={_styles.shadow} />
        <div
          className={css(styles.parallaxHover__wrapper)}
          style={_styles.wrapper}
          ref={(wrapper) => { this.wrapper = wrapper; }}
        >
          { this.renderLayers() }
          <div className={css(styles.parallaxHover__lighting)} style={_styles.lighting} />
        </div>
      </div>
    );
  }
}

ParallaxHover.defaultProps = {
  speed: 100,       // How fast the item scales up and down in MS
  scale: 6,         // How large to scale the item
  rotation: 8,      // Rotation modifier
  shine: 5,         // Light shine brightness modifer
  height: 200,      // Default height
  width: 200,       // Default width
  borderRadius: 0   // Default border radius
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
