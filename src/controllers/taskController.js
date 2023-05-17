const { default: mongoose } = require('mongoose');
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  //const tasks = await Task.find({ user: req.user.username });
  res.render('tasks', {});
};

exports.createTask = async (req, res) => {
  const { nombre_tablero, circuito, lugar, fecha, descripcion,username } = req.body;
  const newTask = new Task({ nombre_tablero, circuito, lugar, fecha, descripcion, username});
  await newTask.save();
  req.flash('success_msg', 'Tarea creada con éxito.');
  res.redirect('/tasks');
};

exports.getTasksall = async (req, res) => {
  const tasks = await Task.find();
  res.render('tasksAll', { tasks });
};
