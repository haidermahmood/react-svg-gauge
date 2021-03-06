var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: {
		index: path.resolve(__dirname, './index.js')
	},
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader',
				test: /\.jsx?$/
			}
		]
	},
	devtool: 'inline-source-map'
};