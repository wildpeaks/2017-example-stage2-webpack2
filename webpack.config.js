/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const postcss_cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = ({minify = false} = {}) => {
	const src = path.resolve(__dirname, 'src');
	const www = path.resolve(__dirname, 'www');
	const env = minify ? 'production' : 'development';

	const plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new SriPlugin({
			hashFuncNames: ['sha256', 'sha384'],
			enabled: minify
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: minify,
			options: {
				context: __dirname
			}
		}),
		new ExtractTextPlugin('bundle.css'),
		new HtmlWebpackPlugin({title: `Env: ${env}`})
	];
	if (minify){
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: 'source-map',
				compress: {
					warnings: false
				},
				output: {
					comments: false
				}
			})
		);
	}

	return {
		devtool: 'source-map',
		target: 'web',
		entry: './src/web.js',
		output: {
			filename: 'bundle.js',
			path: www,
			publicPath: '/',
			crossOriginLoading: 'anonymous'
		},
		bail: true,
		devServer: {
			contentBase: www,
			compress: true,
			port: 8000,
			clientLogLevel: 'none',
			historyApiFallback: true,
			stats: 'errors-only'
		},
		plugins,
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [
						src,
						path.resolve(__dirname, 'node_modules/@wildpeaks')
					],
					use: {
						loader: 'babel-loader',
						options: {
							compact: true,
							presets: [
								['env', {
									modules: false,
									useBuiltins: true,
									targets: {
										ie: 11,
										browsers: ['last 2 versions', '> 5%']
									},
									exclude: ['transform-regenerator']
								}]
							],
							plugins: [
								'babel-plugin-transform-class-properties',
								['transform-runtime', {
									regenerator: false
								}]
							]
						}
					}
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: false
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									plugins: [
										postcss_cssnext({
											browsers: ['last 2 versions', 'ie >= 11']
										})
									]
								}
							}
						]
					})
				},
				{
					test: /\.(jpg|png|gif|svg)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'assets/[name].[ext]'
						}
					}
				},
				{
					test: /\.(ico|woff)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 1,
							name: 'assets/[name].[ext]'
						}
					}
				}
			]
		},
		performance: {
			hints: false
		}
	};
};
