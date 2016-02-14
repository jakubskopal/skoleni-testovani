"use strict";
var express = require('express'),
    app = express(),
    nextId = 0,
    todos = [];

app.use(require('body-parser').json());

app.get('/api', (req, res) => res.end());
app.delete('/api', (req, res) => { todos = []; res.end(); });

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => res.json(addTodo(req.body)));
app.delete('/api/todos', (req, res) => res.json(deleteCompleted()));
app.delete('/api/todos/:id', (req, res) => res.json(deleteTodo(parseInt(req.params['id'], 10))));
app.put('/api/todos/:id', (req, res) => res.json(updateTodo(parseInt(req.params['id'], 10), req.body)));

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
