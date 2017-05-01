/* eslint-env node */
const path = require('path');
const getWebpackConfig = require('./webpack.config.js');

module.exports = config => {
	const coverage = (config.coverage === true);
	const webpackConfig = getWebpackConfig();
	if (coverage){
		webpackConfig.module.rules.unshift({
			test: /\.js$/,
			exclude: /tests/,
			include: [
				path.join(__dirname, 'src')
			],
			use: {
				loader: 'istanbul-instrumenter-loader',
				options: {
					produceSourceMap: true,
					esModules: true
				}
			}
		});
	}
	config.set({
		browsers: ['IE', 'Chrome', 'Firefox'/*, 'PhantomJS'*/],
		frameworks: ['mocha'],
		client: {
			mocha: {
				reporter: 'html'
			}
		},
		files: [
			{pattern: 'src/**/*.tests.js'}
		],
		preprocessors: {
			'src/**/*.tests.js': ['webpack', 'sourcemap']
		},
		webpack: webpackConfig,
		webpackMiddleware: webpackConfig.devServer,
		reporters: ['progress', coverage ? 'coverage-istanbul' : 'html'],
		htmlReporter: {
			outputFile: 'www/karma.tests.html',
			pageTitle: 'Karma Tests',
			subPageTitle: 'All tests that were run in Karma',
			groupSuites: true,
			useCompactStyle: true,
			useLegacyStyle: true
		},
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly', 'text-summary'],
			dir: path.join(__dirname, 'www/coverage/%browser%'),
			includeAllSources: true,
			skipFilesWithNoCoverage: false
		}
	});
};
