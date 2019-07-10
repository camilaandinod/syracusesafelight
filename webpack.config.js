// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const CONFIG = {

	entry: {
		app: resolve('./source/app.js')
	},

	output: {
		library: 'App'
	},

	module: {
		rules: [
			/*{
				// Compile ES2015 using buble
				test: /\.js$/,
				loader: 'buble-loader',
				include: [resolve('.')],
				exclude: [/node_modules/],
				options: {
					objectAssign: 'Object.assign'
				}
			},*/
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
            {
                test: /\.(png|jpg|gif|geojson|csv|gltf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
		]
	},

	// Optional: Enables reading mapbox token from environment variable
	plugins: [
		new HtmlWebpackPlugin({template: './template.html'}),
		new webpack.EnvironmentPlugin(['MapboxAccessToken']),
		new MomentLocalesPlugin()
	]
};

// This line enables bundling against src in this repo rather than installed module
module.exports = CONFIG;
