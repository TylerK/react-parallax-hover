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
      shadowMovement: 0,
      shadowSize: 50,
      scale: 1,
      angle: 0,
      alpha: 0
    };
  }

  __buildState(rotateX, rotateY, shadowMovement, shadowSize, scale, angle, alpha) {
    this.setState({
      rotateX: rotateX,
      rotateY: rotateY,
      shadowMovement: shadowMovement,
      shadowSize: shadowSize,
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

  __handleMouseMove({ pageX, pageY, nativeEvent}) {
    const width = this.props.width;
    const height = this.props.height;
    const { scrollTop: scrollTop, scrollLeft: scrollLeft } = document.body;

    const bounds = this.refs.wrapper.getBoundingClientRect();
    const centerX = this.props.width / 2;
    const centerY = this.props.height / 2;
    const widthMultiplier = 320 / this.props.width;

    const offsetX = 0.52 - (pageX - bounds.left - scrollLeft) / width;
    const offsetY = 0.52 - (pageY - bounds.top - scrollTop) / height;

    const deltaX = (pageX - bounds.left - scrollLeft) - centerX;
    const deltaY = (pageY - bounds.top - scrollTop) - centerY;
    const rotateX = (deltaY - offsetY) * (0.08 * widthMultiplier);
    const rotateY = (offsetX - deltaX) * (0.04 * widthMultiplier);
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleRaw = angleRad * 180 / Math.PI - 90;
    const angleDeg = angleRaw < 0 ? angleRaw + 360 : angleRaw;
    const distanceFromCenter = this.__calculateDistance(bounds, nativeEvent.offsetX, nativeEvent.offsetY);
    const shadowMovement = (nativeEvent.offsetY - bounds.top) * 0.1;
    const shadowSize = distanceFromCenter / 3;
    const alpha = this.__calculateAlphaFromCenter(distanceFromCenter);

    // console.log(`
    //   angle:   ${angleDeg}
    //   pageX:   ${pageX}
    //   pageY:   ${pageY}
    //   offsetX: ${offsetX}
    //   offsetY: ${offsetY}
    //   deltaX: ${deltaX}
    //   deltaY: ${deltaY}
    //   rotateX: ${rotateX}
    //   rotateY: ${rotateY}
    //   dfc: ${distanceFromCenter}
    // `);

    this.__buildState(rotateX, rotateY, shadowMovement, shadowSize, config.scale, angleDeg, alpha);
  }

  __handleMouseLeave() {
    this.__buildState(0, 0, 0, 50, 1, 0, 0);
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

        styles = Object.assign({}, shadow, styles);
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

    const baseTransforms = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);

    const stylesShadow = Object.assign({}, baseTransforms, {
      boxShadow: `0px ${st.shadowMovement}px ${st.shadowSize}px rgba(0, 0, 0, .9)`
    });

    const stylesLighting = Object.assign({}, baseTransforms, {
      backgroundImage: `linear-gradient(${st.angle}deg, rgba(255,255,255, ${st.alpha}) 0%, rgba(255,255,255,0) 40%)`
    });

    return (
      <figure ref='wrapper' className='ph-wrapper' style={stylesWrapper} onMouseMove={this.__handleMouseMove.bind(this)} onMouseLeave={this.__handleMouseLeave.bind(this)}>
        <div className='ph-shadow' style={stylesShadow} />
        {this.__renderChildren(this.props.children)}
        <div className='ph-lighting' style={stylesLighting} />
      </figure>
    );
  }
}
