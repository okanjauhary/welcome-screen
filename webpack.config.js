const webpack = require('webpack');
const path = require('path');
// const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version, description } = require('./package.json');
const Dotenv = require('dotenv-webpack');

const config = {
	mode: process.env.NODE_ENV,
	context: __dirname + '/src',
	entry: {
		background: './background.js',
		'page/app': ['babel-polyfill', './page/app.js']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loaders: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader?indentedSyntax'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '/images/',
					emitFile: false
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '/fonts/',
					emitFile: false
				}
			}
		]
	},
	plugins: [
		new Dotenv(),
		new webpack.DefinePlugin({
			global: 'window'
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyWebpackPlugin([
			{ from: 'page/index.html', to: 'page/index.html' },
			{
				from: 'manifest.json',
				to: 'manifest.json',
				transform: content => {
					const jsonContent = JSON.parse(content);
					jsonContent.version = version;
					jsonContent.description = description;

					if (config.mode === 'development') {
						jsonContent['content_security_policy'] =
							"script-src 'self' 'unsafe-eval'; object-src 'self'";
					}

					return JSON.stringify(jsonContent, null, 2);
				}
			}
		])
	]
};

if (config.mode === 'production') {
	config.plugins = (config.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]);
}

if (process.env.HMR === 'true') {
	config.plugins = (config.plugins || []).concat([
		new ExtensionReloader({
			manifest: __dirname + '/src/manifest.json'
		})
	]);
}

// function transformHtml(content) {
//   return ejs.render(content.toString(), {
//     ...process.env,
//   });
// }

module.exports = config;
