"use strict";
var request = require('request'),
    LocalMVCPage;

LocalMVCPage = function () {
  var sels = {
    text: by.css('input#new-todo'),
    form: by.css('form#todo-form'),
    todos: by.css('ul#todo-list li'),
    ticked: by.css('ul#todo-list li.completed'),
    clearTickedButton: by.css('button#clear-completed')
  };

  this.goto = () => browser.get('http://localhost:9000');

  this.addTodo = function(text) {
    element(sels.text).sendKeys(text);
    element(sels.form).submit();
  };

  this.todoCount = () => element.all(sels.todos).count();
  this.todoText = (i) => element.all(sels.todos).get(i).element(by.css('label')).getText();
  this.tickOff = (i) => element.all(sels.todos).get(i).element(by.css('input[type="checkbox"]')).click();
  this.tickedCount = () => element.all(sels.ticked).count();
  this.clearTicked = () => element(sels.clearTickedButton).click();
};

var Page = new LocalMVCPage();

beforeEach(function() {
  protractor.promise.controlFlow().execute(function() {
    var dfd = protractor.promise.defer();
    request.del('http://localhost:9000/api', function(err, msg) {
      if (err) { dfd.reject(err); } else { dfd.fulfill(msg); }
    });
    return dfd.promise;
  });
});

/**
 * Skript testujici to-do formular na strankach https://angularjs.org, napsany
 * pomoci Jasmine a Protractor. Vice informaci na:
 * http://jasmine.github.io/2.4/introduction.html
 * https://angular.github.io/protractor/#/tutorial
 */
describe('angularjs & todoJS homepage todo list', function() {
  it('should add a todo', function () {
    // Open url
    Page.goto();

    // Add todo
    Page.addTodo('write first protractor test');

    // Check that the new todo is there
    expect(Page.todoCount()).toEqual(1);
    expect(Page.todoText(0)).toEqual('write first protractor test');

    // Tick it off and check that it did
    Page.tickOff(0);
    expect(Page.tickedCount()).toEqual(1);
  });

  it('should clear the ticked todos when asked to do so', function () {
    Page.goto();

    Page.addTodo('another todo');

    expect(Page.todoCount()).toEqual(1);
    Page.tickOff(0);

    Page.clearTicked();
    expect(Page.tickedCount()).toEqual(0);
    expect(Page.todoCount()).toEqual(0);
  });
});

