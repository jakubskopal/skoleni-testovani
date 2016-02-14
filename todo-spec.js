var AngularJSPage, TodoMVCPage;

AngularJSPage = function () {
  var sels = {
    text: by.model('todoList.todoText'),
    addButton: by.css('[value="add"]'),
    todos: by.repeater('todo in todoList.todos'),
    ticked: by.css('.done-true')
  };

  this.goto = function() {
    return browser.get('https://angularjs.org');
  };

  this.addTodo = function(text) {
    element(sels.text).sendKeys(text);
    element(sels.addButton).click();
  };

  this.todoCount = function() {
    return element.all(sels.todos).count();
  };

  this.todoText = function(i) {
    return element.all(sels.todos).get(i).getText();
  };

  this.tickOff = function(i) {
    return element.all(sels.todos).get(i).element(by.css('input')).click();
  };

  this.tickedCount = function() {
    return element.all(sels.ticked).count();
  };
};

TodoMVCPage = function () {
  var sels = {
    text: by.css('input#new-todo'),
    form: by.css('form#todo-form'),
    todos: by.css('ul#todo-list li'),
    ticked: by.css('ul#todo-list li.completed')
  };

  this.goto = function() {
    return browser.get('http://todomvc.com/examples/angularjs/');
  };

  this.addTodo = function(text) {
    element(sels.text).sendKeys(text);
    element(sels.form).submit();
  };

  this.todoCount = function() {
    return element.all(sels.todos).count();
  };

  this.todoText = function(i) {
    return element.all(sels.todos).get(i).element(by.css('label')).getText();
  };

  this.tickOff = function(i) {
    return element.all(sels.todos).get(i).element(by.css('input[type="checkbox"]')).click();
  };

  this.tickedCount = function() {
    return element.all(sels.ticked).count();
  };
};

/**
 * Skript testujici to-do formular na strankach https://angularjs.org, napsany
 * pomoci Jasmine a Protractor. Vice informaci na:
 * http://jasmine.github.io/2.4/introduction.html
 * https://angular.github.io/protractor/#/tutorial
 */
describe('angularjs homepage todo list', function() {
  var Page = new AngularJSPage();
  it('should add a todo', function() {
    // Open url
    Page.goto();

    // Send these keys to
    Page.addTodo('write first protractor test')

    expect(Page.todoCount()).toEqual(3);
    expect(Page.todoText(2)).toEqual('write first protractor test');

    Page.tickOff(2);
    expect(Page.tickedCount()).toEqual(2);
  });
});

/**
 * Skript testujici to-do formular na strnakach http://todomvc.com/examples/angularjs/#/
 */
describe('todomvc angular todo list', function() {
  var Page = new TodoMVCPage();
  it('should add a todo', function() {
    // Open url
    Page.goto();

    // Send these keys to
    Page.addTodo('write first protractor test')

    expect(Page.todoCount()).toEqual(1);
    expect(Page.todoText(0)).toEqual('write first protractor test');

    Page.tickOff(0);
    expect(Page.tickedCount()).toEqual(1);
  });
});

