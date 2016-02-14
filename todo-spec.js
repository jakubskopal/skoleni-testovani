/**
 * Skript testujici to-do formular na strankach https://angularjs.org, napsany
 * pomoci Jasmine a Protractor. Vice informaci na:
 * http://jasmine.github.io/2.4/introduction.html
 * https://angular.github.io/protractor/#/tutorial
 */
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    // Open url
    browser.get('https://angularjs.org');

    // Send these keys to
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

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
  it('should add a todo', function() {
    // Open url
    browser.get('http://todomvc.com/examples/angularjs/');

    // Send these keys to
    element(by.css('input#new-todo')).sendKeys('write first protractor test');
    element(by.css('form#todo-form')).submit();

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