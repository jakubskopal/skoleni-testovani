/**
 * Konfigurace protractoru, vice viz
 * https://github.com/angular/protractor/blob/master/docs/api-overview.md#config-files
 */
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['system/todo-spec.js']
};

