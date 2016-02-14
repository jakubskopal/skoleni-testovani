module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine'
		],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-resource/angular-resource.js',
			'js/**/*.js',
			'tests/unit/**/*.js'
		],
		autoWatch: true,
		singleRun: true,
		browsers: ['Chrome', 'Firefox']
	});
};

