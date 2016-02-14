"use strict";
var express = require('express'),
    app = express(),
    nextId = 0,
    todos = [];

app.use(require('body-parser').json());

app.get('/api', function (req, res) {
  res.end();
});

app.delete('/api', function (req, res) {
  todos = [];
  nextId = 0;
  res.end();
});

app.get('/api/todos', function(req, res) {
  res.json(todos);
});

app.post('/api/todos', function(req, res) {
  res.json(addTodo(req.body));
});

app.delete('/api/todos', function(req, res) {
  res.json(deleteCompleted());
});

app.delete('/api/todos/:id', function(req, res) {
  var id = parseInt(req.params['id'], 10);
  res.json(deleteTodo(id));
});

app.put('/api/todos/:id', function(req, res) {
  var id = parseInt(req.params['id'], 10);
  res.json(updateTodo(id, req.body));
});


function addTodo(todo) {
  var record = {
    id: ++nextId,
    title: todo.title || 'Untitled',
    completed: !!todo.completed,
    order: todo.order || todos.length
  };
  todos.push(record);
  return record;
}

function deleteTodo(id) {
  todos = todos.filter((r) => r.id != id);
  return {};
}

function deleteCompleted() {
  todos = todos.filter((r) => !r.completed);
  return {};
}

function updateTodo(id, newTodo) {
  var oldTodo = todos.find((r) => r.id == id);
  if (!oldTodo) { return {}; }

  oldTodo.title = newTodo.title || oldTodo.title;
  oldTodo.completed = newTodo.completed === undefined ? oldTodo.completed : !!newTodo.completed;
  oldTodo.order = newTodo.order || oldTodo.order;

  return oldTodo;
}

module.exports = app;
