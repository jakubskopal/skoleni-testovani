"use strict";
var AngularJSPage, TodoMVCPage;

AngularJSPage = function () {
  var sels = {
    text: by.model('todoList.todoText'),
    addButton: by.css('[value="add"]'),
    todos: by.repeater('todo in todoList.todos'),
    ticked: by.css('.done-true'),
    clearTickedButton: by.css('a[ng-click="todoList.archive()"]')
  };

  this.goto = () => browser.get('https://angularjs.org');

  this.addTodo = function(text) {
    element(sels.text).sendKeys(text);
    element(sels.addButton).click();
  };

  this.todoCount = () => element.all(sels.todos).count();
  this.todoText = (i) => element.all(sels.todos).get(i).getText();
  this.tickOff = (i) => element.all(sels.todos).get(i).element(by.css('input')).click();
  this.tickedCount = () => element.all(sels.ticked).count();
  this.clearTicked = () => element(sels.clearTickedButton).click();
};

TodoMVCPage = function () {
  var sels = {
    text: by.css('input#new-todo'),
    form: by.css('form#todo-form'),
    todos: by.css('ul#todo-list li'),
    ticked: by.css('ul#todo-list li.completed'),
    clearTickedButton: by.css('button#clear-completed')
  };

  this.goto = () => browser.get('http://todomvc.com/examples/angularjs/');

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

/**
 * Skript testujici to-do formular na strankach https://angularjs.org, napsany
 * pomoci Jasmine a Protractor. Vice informaci na:
 * http://jasmine.github.io/2.4/introduction.html
 * https://angular.github.io/protractor/#/tutorial
 */
describe('angularjs & todoJS homepage todo list', function() {
  test(new AngularJSPage());
  test(new TodoMVCPage());

  function test(Page) {
    it('should add a todo', function () {
      // Open url
      Page.goto();

      var initialCount = Page.todoCount(),
          initialCountPlusOne = initialCount.then(i => i+1),
          initialTickedPlusOne = Page.tickedCount().then(i => i+1);

      // Add todo
      Page.addTodo('write first protractor test');

      // Check that the new todo is there
      expect(Page.todoCount()).toEqual(initialCountPlusOne);
      expect(Page.todoText(initialCount)).toEqual('write first protractor test');

      // Tick it off and check that it did
      Page.tickOff(initialCount);
      expect(Page.tickedCount()).toEqual(initialTickedPlusOne);
    });

    it('should clear the ticked todos when asked to do so', function () {
      Page.goto();

      var initialCount = Page.todoCount(),
          initialCountPlusOne = initialCount.then(i => i + 1),
          initialTickedCount = Page.tickedCount(),
          expectedCount = protractor.promise.all([initialCount, initialTickedCount]).then(function(r) {
            return r[0] - r[1];
          });

      Page.addTodo('another todo');

      expect(Page.todoCount()).toEqual(initialCountPlusOne);
      Page.tickOff(initialCount);

      Page.clearTicked();
      expect(Page.tickedCount()).toEqual(0);
      expect(Page.todoCount()).toEqual(expectedCount);
    });
  }
});

