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

    browser.driver.sleep(5000);
  });
});


