import React, { Component } from 'react';

export default class Gauge extends Component {
	static defaultProps = {
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

	_getPathValues = (value) => {
		var dx = 0;
		var dy = 0;
		var gws = 1;

		var alpha = (1 - (value - this.props.min) / (this.props.max - this.props.min)) * Math.PI;
		var Ro = this.props.width / 2 - this.props.width / 10;
		var Ri = Ro - this.props.width / 18;

		var Cx = this.props.width / 2 + dx;
		var Cy = this.props.height - 4;

		var Xo = this.props.width / 2 + dx + Ro * Math.cos(alpha);
		var Yo = this.props.height - (this.props.height - Cy) - Ro * Math.sin(alpha);
		var Xi = this.props.width / 2 + dx + Ri * Math.cos(alpha);
		var Yi = this.props.height - (this.props.height - Cy) - Ri * Math.sin(alpha);
		
		return { alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
	};

	_getPath = (value) => {
		var dx = 0;
		var dy = 0;
		var gws = 1;

		var { alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = this._getPathValues(value);

		var path = "M" + (Cx - Ri) + "," + Cy + " ";
		path += "L" + (Cx - Ro) + "," + Cy + " ";
		path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
		path += "L" + Xi + "," + Yi + " ";
		path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
		path += "Z ";

		return path;
	};

	
	componentDidUpdate(){
		var valuePoint = this._getPathValues(this.props.value);
		var { Cx, Ro, Ri, Xo, Cy, Xi, Yo, Yi } = this._getPathValues(this.props.max);
		var minX = (Cx - Ro + (Cx - Ri)) / 2;
		var maxX = (Xo + Xi) / 2
		var midX = (minX + maxX)/2;	
		this.props.getAngle(midX, Cy, valuePoint.Xo, valuePoint.Yo);
	};
	
	render() {
		var topLabelStyle = (this.props.topLabelStyle.fontSize
				? this.props.topLabelStyle
				: {...this.props.topLabelStyle, fontSize: (this.props.width / 10) });
		var { Cx, Ro, Ri, Xo, Cy, Xi, Yo, Yi } = this._getPathValues(this.props.max);
		var valuePoint = this._getPathValues(this.props.value);
			var midValue = (this.props.max + this.props.min) / 2;
			var midObject = this._getPathValues(midValue);
			var minX = (Cx - Ro + (Cx - Ri)) / 2;
			var maxX = (Xo + Xi) / 2
			var midX = (minX + maxX)/2;			
			var m = 0;
			if(valuePoint.Xo != midX) {
				m = (valuePoint.Yo - Cy)/(valuePoint.Xo - midX);
			}
			var radius = Math.sqrt(Math.pow((valuePoint.Xo - midX), 2) + Math.pow((valuePoint.Yo - Cy), 2));
			var labelRadius = radius + 20;
			var labelX = midX, labelY = Cy - labelRadius;			
			var sign = m > 0 ? -1:1;
			if(m != 0){				
				labelX = midX + sign * Math.sqrt(Math.pow(labelRadius, 2)/(1 + Math.pow(m, 2)));
				labelY = m * (labelX - midX) + Cy;
			}			
			var valuesNotSet = isNaN(labelX) || isNaN(labelY);
		
		return (
				<svg height="100%" version="1.1" width="100%" style={{width: this.props.width, height: this.props.height, overflow: 'hidden', position: 'relative', left: 0, top: 0}}>					
					<defs>
						<filter id="g3-inner-shadow">
							<feOffset dx="0" dy="3" />
							<feGaussianBlur result="offset-blur" stdDeviation="5" />
							<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
							<feFlood floodColor="black" floodOpacity="0.2" result="color" />
							<feComposite operator="in" in="color" in2="inverse" result="shadow" />
							<feComposite operator="over" in="shadow" in2="SourceGraphic" />
						</filter>
						<linearGradient id='linear' x1='0%' y1='0%' x2='100%' y2='0%'>
							<stop offset='0%' stopColor='#d77065' />
							<stop offset='30%' stopColor='#f6a461' />
							<stop offset='70%' stopColor='#eed78a' />
							<stop offset='100%' stopColor='#579c88' />
						</linearGradient>						
					</defs>
					<path fill='url(#linear)' stroke="none" d={this._getPath(this.props.min)} filter="url(#g3-inner-shadow)" />
					<path fill='url(#linear)' stroke="none" d={this._getPath(-60)} filter="url(#g3-inner-shadow)" />
					<path fill='url(#linear)' stroke="none" d={this._getPath(60)} filter="url(#g3-inner-shadow)" />
					<path fill='url(#linear)' stroke="none" d={this._getPath(this.props.max)} filter="url(#g3-inner-shadow)" />
					<text x={this.props.width / 2} y={this.props.height / 8} textAnchor="middle" style={topLabelStyle}>
						{ this.props.label }
					</text>
					{ !valuesNotSet ? 
						<text x={labelX} y={labelY} textAnchor="middle" style={this.props.valueLabelStyle}>
							{ this.props.value }
						</text>
						: null
					}
					<text x={(Cx - Ro + (Cx - Ri)) / 2 + 45} y={Cy + 3} textAnchor="middle" style={this.props.minMaxLabelStyle}>
						{this.props.min}
					</text>
					<text x={(Xo + Xi) / 2 - 45} y={Cy + 3} textAnchor="middle" style={this.props.minMaxLabelStyle}>
						{this.props.max}
					</text>
					<line x1={(Cx - Ro + (Cx - Ri)) / 2 - 20} x2={(Cx - Ro + (Cx - Ri)) / 2  + 20} y1={Cy - 1} y2={Cy - 1} style={this.props.lineStyle} />
					<line x1={(Xo + Xi) / 2 - 20} x2={(Xo + Xi) / 2 + 20} y1={Cy - 1} y2={Cy - 1} style={this.props.lineStyle} />
					<line x1={midObject.Xo} x2={midObject.Xo} y1={midObject.Yo + 30} y2={midObject.Yo - 8} style={this.props.lineStyle} />
					<text x={midObject.Xo} y={midObject.Yo - 15} textAnchor="middle" style={this.props.minMaxLabelStyle}>
						{midValue}
					</text>
				</svg>		
		);
	}
}