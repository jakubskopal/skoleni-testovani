module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');

  grunt.initConfig({
    protractor_webdriver: {
      run: {}
    },
    protractor: {
      options: {
        keepAlive: true,
        configFile: 'conf.js'
      },
      run: {}
    }
  });

  grunt.registerTask('test', [
    'protractor_webdriver:run',
    'protractor:run'
  ]);

  grunt.registerTask('default', ['test']);
};
