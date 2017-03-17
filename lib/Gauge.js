'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gauge = function (_Component) {
	_inherits(Gauge, _Component);

	function Gauge() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Gauge);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Gauge.__proto__ || Object.getPrototypeOf(Gauge)).call.apply(_ref, [this].concat(args))), _this), _this._getPathValues = function (value) {
			var dx = 0;
			var dy = 0;
			var gws = 1;

			var alpha = (1 - (value - _this.props.min) / (_this.props.max - _this.props.min)) * Math.PI;
			var Ro = _this.props.width / 2 - _this.props.width / 10;
			var Ri = Ro - _this.props.width / 18;

			var Cx = _this.props.width / 2 + dx;
			var Cy = _this.props.height - 4;

			var Xo = _this.props.width / 2 + dx + Ro * Math.cos(alpha);
			var Yo = _this.props.height - (_this.props.height - Cy) - Ro * Math.sin(alpha);
			var Xi = _this.props.width / 2 + dx + Ri * Math.cos(alpha);
			var Yi = _this.props.height - (_this.props.height - Cy) - Ri * Math.sin(alpha);

			return { alpha: alpha, Ro: Ro, Ri: Ri, Cx: Cx, Cy: Cy, Xo: Xo, Yo: Yo, Xi: Xi, Yi: Yi };
		}, _this._getPath = function (value) {
			var dx = 0;
			var dy = 0;
			var gws = 1;

			var _this$_getPathValues = _this._getPathValues(value);

			var alpha = _this$_getPathValues.alpha;
			var Ro = _this$_getPathValues.Ro;
			var Ri = _this$_getPathValues.Ri;
			var Cx = _this$_getPathValues.Cx;
			var Cy = _this$_getPathValues.Cy;
			var Xo = _this$_getPathValues.Xo;
			var Yo = _this$_getPathValues.Yo;
			var Xi = _this$_getPathValues.Xi;
			var Yi = _this$_getPathValues.Yi;


			var path = "M" + (Cx - Ri) + "," + Cy + " ";
			path += "L" + (Cx - Ro) + "," + Cy + " ";
			path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
			path += "L" + Xi + "," + Yi + " ";
			path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
			path += "Z ";

			return path;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Gauge, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var valuePoint = this._getPathValues(this.props.value);

			var _getPathValues = this._getPathValues(this.props.max);

			var Cx = _getPathValues.Cx;
			var Ro = _getPathValues.Ro;
			var Ri = _getPathValues.Ri;
			var Xo = _getPathValues.Xo;
			var Cy = _getPathValues.Cy;
			var Xi = _getPathValues.Xi;
			var Yo = _getPathValues.Yo;
			var Yi = _getPathValues.Yi;

			var minX = (Cx - Ro + (Cx - Ri)) / 2;
			var maxX = (Xo + Xi) / 2;
			var midX = (minX + maxX) / 2;
			this.props.getAngle(midX, Cy, valuePoint.Xo, valuePoint.Yo);
		}
	}, {
		key: 'render',
		value: function render() {
			var topLabelStyle = this.props.topLabelStyle.fontSize ? this.props.topLabelStyle : _extends({}, this.props.topLabelStyle, { fontSize: this.props.width / 10 });

			var _getPathValues2 = this._getPathValues(this.props.max);

			var Cx = _getPathValues2.Cx;
			var Ro = _getPathValues2.Ro;
			var Ri = _getPathValues2.Ri;
			var Xo = _getPathValues2.Xo;
			var Cy = _getPathValues2.Cy;
			var Xi = _getPathValues2.Xi;
			var Yo = _getPathValues2.Yo;
			var Yi = _getPathValues2.Yi;

			var valuePoint = this._getPathValues(this.props.value);
			var midValue = (this.props.max + this.props.min) / 2;
			var midObject = this._getPathValues(midValue);
			var minX = (Cx - Ro + (Cx - Ri)) / 2;
			var maxX = (Xo + Xi) / 2;
			var midX = (minX + maxX) / 2;
			var m = 0;
			if (valuePoint.Xo != midX) {
				m = (valuePoint.Yo - Cy) / (valuePoint.Xo - midX);
			}
			var radius = Math.sqrt(Math.pow(valuePoint.Xo - midX, 2) + Math.pow(valuePoint.Yo - Cy, 2));
			var labelRadius = radius + 20;
			var labelX = midX,
			    labelY = Cy - labelRadius;
			var sign = m > 0 ? -1 : 1;
			if (m != 0) {
				labelX = midX + sign * Math.sqrt(Math.pow(labelRadius, 2) / (1 + Math.pow(m, 2)));
				labelY = m * (labelX - midX) + Cy;
			}			
			else {
				labelX = midX + sign * Math.sqrt(Math.pow(labelRadius, 2) / (1 + Math.pow(m, 2))) + 5;
				labelY = m * (labelX - midX) + Cy + 2;	
			}
			var valuesNotSet = isNaN(labelX) || isNaN(labelY);

			return _react2.default.createElement(
				'svg',
				{ height: '100%', version: '1.1', width: '100%', style: { width: this.props.width, height: this.props.height, overflow: 'hidden', position: 'relative', left: 0, top: 0 } },
				_react2.default.createElement(
					'defs',
					null,
					_react2.default.createElement(
						'filter',
						{ id: 'g3-inner-shadow' },
						_react2.default.createElement('feOffset', { dx: '0', dy: '3' }),
						_react2.default.createElement('feGaussianBlur', { result: 'offset-blur', stdDeviation: '5' }),
						_react2.default.createElement('feComposite', { operator: 'out', 'in': 'SourceGraphic', in2: 'offset-blur', result: 'inverse' }),
						_react2.default.createElement('feFlood', { floodColor: 'black', floodOpacity: '0.2', result: 'color' }),
						_react2.default.createElement('feComposite', { operator: 'in', 'in': 'color', in2: 'inverse', result: 'shadow' }),
						_react2.default.createElement('feComposite', { operator: 'over', 'in': 'shadow', in2: 'SourceGraphic' })
					),
					_react2.default.createElement(
						'linearGradient',
						{ id: 'linear', x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
						_react2.default.createElement('stop', { offset: '0%', stopColor: '#d77065' }),
						_react2.default.createElement('stop', { offset: '30%', stopColor: '#f6a461' }),
						_react2.default.createElement('stop', { offset: '70%', stopColor: '#eed78a' }),
						_react2.default.createElement('stop', { offset: '100%', stopColor: '#579c88' })
					)
				),
				_react2.default.createElement('path', { fill: 'url(#linear)', stroke: 'none', d: this._getPath(this.props.min), filter: 'url(#g3-inner-shadow)' }),
				_react2.default.createElement('path', { fill: 'url(#linear)', stroke: 'none', d: this._getPath(-60), filter: 'url(#g3-inner-shadow)' }),
				_react2.default.createElement('path', { fill: 'url(#linear)', stroke: 'none', d: this._getPath(60), filter: 'url(#g3-inner-shadow)' }),
				_react2.default.createElement('path', { fill: 'url(#linear)', stroke: 'none', d: this._getPath(this.props.max), filter: 'url(#g3-inner-shadow)' }),
				_react2.default.createElement(
					'text',
					{ x: this.props.width / 2, y: this.props.height / 8, textAnchor: 'middle', style: topLabelStyle },
					this.props.label
				),
				!valuesNotSet ? _react2.default.createElement(
					'text',
					{ x: labelX, y: labelY, textAnchor: 'middle', style: this.props.valueLabelStyle },
					this.props.value
				) : null,
				_react2.default.createElement(
					'text',
					{ x: (Cx - Ro + (Cx - Ri)) / 2 + 45, y: Cy + 3, textAnchor: 'middle', style: this.props.minMaxLabelStyle },
					this.props.min
				),
				_react2.default.createElement(
					'text',
					{ x: (Xo + Xi) / 2 - 45, y: Cy + 3, textAnchor: 'middle', style: this.props.minMaxLabelStyle },
					this.props.max
				),
				_react2.default.createElement('line', { x1: (Cx - Ro + (Cx - Ri)) / 2 - 20, x2: (Cx - Ro + (Cx - Ri)) / 2 + 20, y1: Cy - 1, y2: Cy - 1, style: this.props.lineStyle }),
				_react2.default.createElement('line', { x1: (Xo + Xi) / 2 - 20, x2: (Xo + Xi) / 2 + 20, y1: Cy - 1, y2: Cy - 1, style: this.props.lineStyle }),
				_react2.default.createElement('line', { x1: midObject.Xo, x2: midObject.Xo, y1: midObject.Yo + 30, y2: midObject.Yo - 8, style: this.props.lineStyle }),
				_react2.default.createElement(
					'text',
					{ x: midObject.Xo, y: midObject.Yo - 15, textAnchor: 'middle', style: this.props.minMaxLabelStyle },
					midValue
				)
			);
		}
	}]);

	return Gauge;
}(_react.Component);

Gauge.defaultProps = {
	label: "React SVG Gauge",
	min: 0,
	max: 100,
	value: 40,
	width: 400,
	height: 320,
	color: '#fe0400',
	backgroundColor: "#edebeb",
	topLabelStyle: { textAnchor: "middle", fill: "#999999", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: 'bold', fontStretch: 'normal', lineHeight: 'normal', fillOpacity: 1 },
	valueLabelStyle: { textAnchor: "middle", fill: "#010101", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: 'bold', fontStretch: 'normal', fontSize: 16, lineHeight: 'normal', fillOpacity: 1 },
	minMaxLabelStyle: { textAnchor: "middle", fill: "#666666", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: 'normal', fontStretch: 'normal', fontSize: 16, lineHeight: 'normal', fillOpacity: 1 },
	lineStyle: { stroke: "#999", strokeWidth: 2 }

};
exports.default = Gauge;
module.exports = exports['default'];