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

    Page.addTodo('one todo');
    Page.addTodo('another todo');

    expect(Page.todoCount()).toEqual(2);
    Page.tickOff(0);

    Page.clearTicked();
    expect(Page.tickedCount()).toEqual(0);
    expect(Page.todoCount()).toEqual(1);
  });

  it('should not allow adding more than 10 todos', function() {
    var i;

    Page.goto();

    for (i=0; i<10; i++) { Page.addTodo('todo #'+i); }
    expect(Page.todoCount()).toEqual(10);

    Page.addTodo('extra todo');
    expect(Page.todoCount()).toEqual(10);
  })
});

