import React from 'react';

const config = {
  scale: 1.05, // How large to scale the item: 1.00 -> 1.10~
  rotation: 0.3, // Rotation modifier: 0.1 (more) -> 0.5 (less)
  alpha: 0.4, // Alpha channel modifer: 1.01 -> 1.1~
  shadow: 8 // How much the shadow moves
};

export default class ParallaxHover extends React.Component {
  static propTypes() {
    return {
      children: React.Proptypes.node.isRequired,
      width: React.Proptypes.string.isRequired,
      height: React.Proptypes.string.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      rotateX: 0,
      rotateY: 0,
      movement: 0,
      scale: 1,
      angle: 0,
      alpha: 0
    };
  }

  __buildState(rotateX, rotateY, movement, scale, angle, alpha) {
    this.setState({
      rotateX: rotateX,
      rotateY: rotateY,
      movement: movement,
      scale: scale,
      angle: angle,
      alpha: alpha
    });
  }

  __buildTransformStrings(rotateX, rotateY, scale) {
    return {
      WebkitTransform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      MozTransform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    };
  }

  __calculateDistance(bounds, offsetX, offsetY) {
    const distanceX = Math.pow(offsetX - (bounds.width / 2), 2);
    const distanceY = Math.pow(offsetY - (bounds.height / 2), 2);
    return Math.floor(Math.sqrt(distanceX + distanceY));
  }

  __calculateAlphaFromCenter(current) {
    const max = Math.max(this.props.width, this.props.height);
    return current / max * config.alpha;
  }

  __handleMouseMove(event) {
    const nativeEvent = event.nativeEvent;
    const bounds = nativeEvent.target.getBoundingClientRect();
    const centerX = this.props.width / 2;
    const centerY = this.props.height / 2;
    const offsetX = nativeEvent.offsetX;
    const offsetY = nativeEvent.offsetY;
    const deltaX = offsetX - centerX;
    const deltaY = offsetY - centerY;
    const rotateX = deltaX / (config.rotation * 100);
    const rotateY = deltaY / (config.rotation * 100);
    const movement = nativeEvent.offsetY / bounds.top;
    const distanceFromCenter = this.__calculateDistance(bounds, offsetX, offsetY);
    const alpha = this.__calculateAlphaFromCenter(distanceFromCenter);
    const shadowMovement = movement * config.shadow;
    const angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * 180 / Math.PI - 90;

    if (angleDeg <= 0) {
      angleDeg = angleDeg + 360;
    }

    this.__buildState(rotateX, rotateY, shadowMovement, config.scale, angleDeg, alpha);
  }

  __handleMouseLeave() {
    this.__buildState(0, 0, 0, 1, 0, 0);
  }

  __renderChildren(children) {
    const st = this.state;

    if (!Array.isArray(children)) {
      let styles = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
      console.log(this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale));
      return <div style={styles} className='ph-layer'>{children}</div>;
    }

    return children.map((layer, key) => {
      let num = key + 1;
      let rotateX = st.rotateX / num;
      let rotateY = st.rotateY / num;
      let movement = (st.movement * num) * 0.1;
      let styles = this.__buildTransformStrings(rotateX, rotateY, st.scale);

      if (layer.ref === 'text') {
        let shadow = {
          textShadow: `${movement}px ${movement}px 20px rgba(0, 0, 0, 0.5)`
        };

        styles = Object.assign(shadow, styles);
      }

      return <div style={styles} className='ph-layer' key={key}>{layer}</div>;
    });
  }

  render() {
    const st = this.state;

    const stylesWrapper = {
      width: this.props.width,
      height: this.props.height
    };

    const stylesShadow = {
      WebkitTransform: `translateX(${st.movement}) translateY(${st.movement})`,
      MozTransform: `translateX(${st.movement}) translateY(${st.movement})`,
      transform: `translateX(${st.movement}) translateY(${st.movement})`
    };

    const transformLighting = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
    const stylesLighting = Object.assign(transformLighting, {
      backgroundImage: `linear-gradient(${st.angle}deg, rgba(255,255,255, ${st.alpha}) 0%, rgba(255,255,255,0) 40%)`
    });

    return (
      <figure className='ph-wrapper' style={stylesWrapper} onMouseMove={this.__handleMouseMove.bind(this)} onMouseLeave={this.__handleMouseLeave.bind(this)}>
        <div className='ph-shadow' style={stylesShadow} />
        {this.__renderChildren(this.props.children)}
        <div className='ph-lighting' style={stylesLighting} />
      </figure>
    );
  }
}
