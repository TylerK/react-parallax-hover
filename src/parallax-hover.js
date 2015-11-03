import React from 'react';

const config = {
  scale: 1.03, // How large to scale the item: 1.00 -> 1.10~
  rotation: 0.3, // Rotation modifier: 0.1 (more) -> 0.5 (less)
  alpha: 0.4, // Alpha channel modifer: 1.01 -> 1.1~
  shadow: 8 // How much the shadow moves
};

const transition = 'all 0.3s ease-out';
const layersBase = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

const styles = {
  phOutter: () => ({
    transformStyle: 'preserve-3d'
  }),
  phWrapper: () => ({
    position: 'relative',
    transition: transition,
    margin: 0,
    padding: 0
  }),
  phShadow: () => Object.assign({}, layersBase, {
    height: '90%',
    width: '90%',
    left: '5%',
    top: '5%',
    background: 'none',
    transition: transition
  }),
  phLayers: () => Object.assign({}, layersBase, {}),
  phLayer: () => Object.assign({}, layersBase, {}),
  phLighting: () => Object.assign({}, layersBase, {
    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 33%)'
  }),
  phText: () => Object.assign({}, layersBase, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '5rem',
    color: '#ffffff'
  })
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
      shadowMovement: 20,
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
    const shadowMovement = centerY * 0.25;
    const shadowSize = 120;
    const alpha = this.__calculateAlphaFromCenter(distanceFromCenter);

    this.__buildState(rotateX, rotateY, shadowMovement, shadowSize, config.scale, angleDeg, alpha);
  }

  __handleMouseLeave() {
    this.__buildState(0, 0, 20, 50, 1, 0, 0);
  }

  __renderChildren(children) {
    const st = this.state;

    if (!Array.isArray(children)) {
      const transforms = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
      const style = Object.assign({}, styles.phLayer(), transforms);
      return <div style={style} className='ph-layer'>{children}</div>;
    }

    return children.map((layer, key) => {
      const num = key + 1;
      const rotateX = Math.floor(st.rotateX / num);
      const rotateY = Math.floor(st.rotateY / num);
      let _style = this.__buildTransformStrings(rotateX, rotateY, st.scale);

      if (layer.ref === 'text') {
        const shadow = {
          textShadow: `${rotateY * 0.5}px ${rotateX * 0.5}px 10px rgba(0, 0, 0, 0.3)`
        };
        layer = layer.props.children;
        _style = Object.assign({}, styles.phText(), shadow, _style);
      }

      return <div style={_style} key={key}>{layer}</div>;
    });
  }

  render() {
    const st = this.state;
    const baseTransforms = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);

    const stylesWrapper = Object.assign({}, styles.phWrapper(), baseTransforms, {
      width: this.props.width,
      height: this.props.height
    });

    const stylesShadow = Object.assign({}, styles.phShadow(), baseTransforms, {
      boxShadow: `0px ${st.shadowMovement}px ${st.shadowSize}px rgba(0, 0, 0, 0.6)`
    });

    const stylesLighting = Object.assign({}, styles.phLighting(), baseTransforms, {
      backgroundImage: `linear-gradient(${st.angle}deg, rgba(255,255,255, ${st.alpha}) 0%, rgba(255,255,255,0) 40%)`
    });

    return (
      <div style={styles.phOutter()}>
        <figure ref='wrapper' className='ph-wrapper' style={stylesWrapper} onMouseMove={this.__handleMouseMove.bind(this)} onMouseLeave={this.__handleMouseLeave.bind(this)}>
          <div className='ph-shadow' style={stylesShadow} />
          <div className='ph-layers'>
            {this.__renderChildren(this.props.children)}
          </div>
          <div className='ph-lighting' style={stylesLighting} />
        </figure>
      </div>
    );
  }
}
