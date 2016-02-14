/**
 * Hlavni funkce grunt build skriptu, vice viz:
 * http://gruntjs.com/api/grunt
 *
 * @param grunt instance gruntu bude predana sem
 */
module.exports = function(grunt) {
  // nacti tasky, ktere budeme potrebovat
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');

  // specifikuj konfiguraci jednotlivych tasku
  grunt.initConfig({
    // je treba nastartovat webdriver (fungujeme lokalne)
    protractor_webdriver: {
      run: {}
    },

    // spustime protractor testy z conf.js
    protractor: {
      options: {
        keepAlive: true,
        configFile: 'conf.js'
      },
      run: {}
    }
  });

  // definujeme task test, ktery spusti selenium
  // webdriver a v zapeti i samotne testy
  grunt.registerTask('test', [
    'protractor_webdriver:run',
    'protractor:run'
  ]);

  // pokud nebude uvedeno jinak, spousti se task
  // test
  grunt.registerTask('default', ['test']);
};
