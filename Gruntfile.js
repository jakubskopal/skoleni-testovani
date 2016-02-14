/**
 * Hlavni funkce grunt build skriptu, vice viz:
 * http://gruntjs.com/api/grunt
 *
 * @param grunt instance gruntu bude predana sem
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    protractor_webdriver: {
      run: {}
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: 'tests/protractor.conf.js'
      },
      system: {}
    },

    karma: {
      unit: {
        configFile: 'tests/karma.conf.js'
      }
    },

    express: {
      options: {
        port: 9000,
        hostname: '*'
      },
      test: {
        options: {
          bases: ['.'],
          server: './server'
        }
      },
      run: {
        options: {
          bases: ['.'],
          livereload: true,
          server: './server'
        }
      }
    },

    watch: {
      run: {
        files: ['.']
      }
    },

    open: {
      run: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    }
  });

  grunt.registerTask('unit-test', [
      'karma:unit'
  ]);

  grunt.registerTask('system-test', [
      'protractor_webdriver:run',
      'protractor:system'
  ]);

  grunt.registerTask('test', [
      'unit-test',
      'express:test',
      'system-test'
  ]);

  grunt.registerTask('run', [
      'express:run',
      'open',
      'watch'
  ]);

  // pokud nebude uvedeno jinak, spousti se task
  // test
  grunt.registerTask('default', ['test']);
};
