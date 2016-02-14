var AngularJSPage, TodoMVCPage;

AngularJSPage = {
  sels: {
    text: by.model('todoList.todoText'),
    addButton: by.css('[value="add"]')
  },
  goto: function() {
    return browser.get('https://angularjs.org');
  },
  addTodo: function(text) {
    element(AngularJSPage.sels.text).sendKeys(text);
    element(AngularJSPage.sels.addButton).click();
  }
};

TodoMVCPage = {
  sels: {
    text: by.css('input#new-todo'),
    form: by.css('form#todo-form')
  },
  goto: function() { return browser.get('http://todomvc.com/examples/angularjs/'); },
  addTodo: function(text) {
    element(TodoMVCPage.sels.text).sendKeys(text);
    element(TodoMVCPage.sels.form).submit();
  }
};

describe('angularjs homepage todo list', function() {
  var Page = AngularJSPage;
  it('should add a todo', function() {
    // Open url
    Page.goto();

    // Send these keys to
    Page.addTodo('write first protractor test')

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});

/**
 * Skript testujici to-do formular na strnakach http://todomvc.com/examples/angularjs/#/
 */
describe('todomvc angular todo list', function() {
  var Page = TodoMVCPage;
  it('should add a todo', function() {
    // Open url
    Page.goto();

    // Send these keys to
    Page.addTodo('write first protractor test')

    var todoList = element.all(by.css('ul#todo-list li'));
    expect(todoList.count()).toEqual(1);
    expect(todoList.get(0).element(by.css('label')).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(0).element(by.css('input[type="checkbox"]')).click();
    var completedAmount = element.all(by.css('ul#todo-list li.completed'));
    expect(completedAmount.count()).toEqual(1);
  });
});

describe('generic todo list', function() {
  it('should add todo', function() {
    // goto the main to-do page
    // add a to-do
    // check that the newly added to-do is there and has the right content
    // cross it off the list
    // check that it's been crossed
  });
});