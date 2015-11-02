'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
  scale: 1.03, // How large to scale the item: 1.00 -> 1.10~
  rotation: 0.3, // Rotation modifier: 0.1 (more) -> 0.5 (less)
  alpha: 0.4, // Alpha channel modifer: 1.01 -> 1.1~
  shadow: 8 // How much the shadow moves
};

var ParallaxHover = (function (_React$Component) {
  _inherits(ParallaxHover, _React$Component);

  _createClass(ParallaxHover, null, [{
    key: 'propTypes',
    value: function propTypes() {
      return {
        children: _react2.default.Proptypes.node.isRequired,
        width: _react2.default.Proptypes.string.isRequired,
        height: _react2.default.Proptypes.string.isRequired
      };
    }
  }]);

  function ParallaxHover(props) {
    _classCallCheck(this, ParallaxHover);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParallaxHover).call(this, props));

    _this2.state = {
      rotateX: 0,
      rotateY: 0,
      shadowMovement: 20,
      shadowSize: 50,
      scale: 1,
      angle: 0,
      alpha: 0
    };
    return _this2;
  }

  _createClass(ParallaxHover, [{
    key: '__buildState',
    value: function __buildState(rotateX, rotateY, shadowMovement, shadowSize, scale, angle, alpha) {
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
  }, {
    key: '__buildTransformStrings',
    value: function __buildTransformStrings(rotateX, rotateY, scale) {
      return {
        WebkitTransform: 'perspective(1000px) scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)',
        MozTransform: 'perspective(1000px) scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)',
        transform: 'perspective(1000px) scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)'
      };
    }
  }, {
    key: '__calculateDistance',
    value: function __calculateDistance(bounds, offsetX, offsetY) {
      var distanceX = Math.pow(offsetX - bounds.width / 2, 2);
      var distanceY = Math.pow(offsetY - bounds.height / 2, 2);
      return Math.floor(Math.sqrt(distanceX + distanceY));
    }
  }, {
    key: '__calculateAlphaFromCenter',
    value: function __calculateAlphaFromCenter(current) {
      var max = Math.max(this.props.width, this.props.height);
      return current / max * config.alpha;
    }
  }, {
    key: '__handleMouseMove',
    value: function __handleMouseMove(_ref) {
      var pageX = _ref.pageX;
      var pageY = _ref.pageY;
      var nativeEvent = _ref.nativeEvent;

      var width = this.props.width;
      var height = this.props.height;
      var _document$body = document.body;
      var scrollTop = _document$body.scrollTop;
      var scrollLeft = _document$body.scrollLeft;

      var bounds = this.refs.wrapper.getBoundingClientRect();
      var centerX = this.props.width / 2;
      var centerY = this.props.height / 2;
      var widthMultiplier = 320 / this.props.width;

      var offsetX = 0.52 - (pageX - bounds.left - scrollLeft) / width;
      var offsetY = 0.52 - (pageY - bounds.top - scrollTop) / height;

      var deltaX = pageX - bounds.left - scrollLeft - centerX;
      var deltaY = pageY - bounds.top - scrollTop - centerY;
      var rotateX = (deltaY - offsetY) * (0.08 * widthMultiplier);
      var rotateY = (offsetX - deltaX) * (0.04 * widthMultiplier);
      var angleRad = Math.atan2(deltaY, deltaX);
      var angleRaw = angleRad * 180 / Math.PI - 90;
      var angleDeg = angleRaw < 0 ? angleRaw + 360 : angleRaw;
      var distanceFromCenter = this.__calculateDistance(bounds, nativeEvent.offsetX, nativeEvent.offsetY);
      var shadowMovement = centerY * 0.25;
      var shadowSize = 120;
      var alpha = this.__calculateAlphaFromCenter(distanceFromCenter);

      this.__buildState(rotateX, rotateY, shadowMovement, shadowSize, config.scale, angleDeg, alpha);
    }
  }, {
    key: '__handleMouseLeave',
    value: function __handleMouseLeave() {
      this.__buildState(0, 0, 20, 50, 1, 0, 0);
    }
  }, {
    key: '__renderChildren',
    value: function __renderChildren(children) {
      var _this = this;

      var st = this.state;

      if (!Array.isArray(children)) {
        var styles = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
        console.log(this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale));
        return _react2.default.createElement(
          'div',
          { style: styles, className: 'ph-layer' },
          children
        );
      }

      return children.map(function (layer, key) {
        var num = key + 1;
        var rotateX = Math.floor(st.rotateX / num);
        var rotateY = Math.floor(st.rotateY / num);
        var styles = _this.__buildTransformStrings(rotateX, rotateY, st.scale);
        var textClass = undefined;

        if (layer.ref === 'text') {
          textClass = 'ph-text';
          var shadow = {
            textShadow: rotateY * 0.5 + 'px ' + rotateX * 0.5 + 'px 10px rgba(0, 0, 0, 0.5)'
          };

          styles = Object.assign({}, shadow, styles);
        }

        return _react2.default.createElement(
          'div',
          { style: styles, className: 'ph-layer ' + textClass, key: key },
          layer
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var st = this.state;
      var baseTransforms = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);

      var stylesWrapper = Object.assign({}, baseTransforms, {
        width: this.props.width,
        height: this.props.height
      });

      var stylesShadow = Object.assign({}, baseTransforms, {
        boxShadow: '0px ' + st.shadowMovement + 'px ' + st.shadowSize + 'px rgba(0, 0, 0, 0.6)'
      });

      var stylesLighting = Object.assign({}, baseTransforms, {
        backgroundImage: 'linear-gradient(' + st.angle + 'deg, rgba(255,255,255, ' + st.alpha + ') 0%, rgba(255,255,255,0) 40%)'
      });

      return _react2.default.createElement(
        'div',
        { style: { transformStyle: 'preserve-3d' } },
        _react2.default.createElement(
          'figure',
          { ref: 'wrapper', className: 'ph-wrapper', style: stylesWrapper, onMouseMove: this.__handleMouseMove.bind(this), onMouseLeave: this.__handleMouseLeave.bind(this) },
          _react2.default.createElement('div', { className: 'ph-shadow', style: stylesShadow }),
          _react2.default.createElement(
            'div',
            { className: 'ph-layers' },
            this.__renderChildren(this.props.children)
          ),
          _react2.default.createElement('div', { className: 'ph-lighting', style: stylesLighting })
        )
      );
    }
  }]);

  return ParallaxHover;
})(_react2.default.Component);

exports.default = ParallaxHover;
