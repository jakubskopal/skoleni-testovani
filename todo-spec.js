var AngularJSPage, TodoMVCPage;

AngularJSPage = function () {
  var sels = {
    text: by.model('todoList.todoText'),
    addButton: by.css('[value="add"]'),
    todos: by.repeater('todo in todoList.todos'),
    ticked: by.css('.done-true')
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
};

TodoMVCPage = function () {
  var sels = {
    text: by.css('input#new-todo'),
    form: by.css('form#todo-form'),
    todos: by.css('ul#todo-list li'),
    ticked: by.css('ul#todo-list li.completed')
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
};

/**
 * Skript testujici to-do formular na strankach https://angularjs.org, napsany
 * pomoci Jasmine a Protractor. Vice informaci na:
 * http://jasmine.github.io/2.4/introduction.html
 * https://angular.github.io/protractor/#/tutorial
 */
describe('angularjs & todoJS homepage todo list', function() {
  shouldAddTodo(new AngularJSPage());
  shouldAddTodo(new TodoMVCPage());

  function shouldAddTodo(Page) {
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
  }
});

