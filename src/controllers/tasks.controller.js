import Task from "../models/Task.js";


export const renderTasksForm = (req, res) => res.render("Tasks/new-tasks");

export const createNewTasks = async (req, res) => {
  const { nombre_tablero, circuito, lugar, fecha, materiales, descripción,username } = req.body;

  const errors = [];
  if (!nombre_tablero) { 
    errors.push({ text: "Por favor escriba el nombre del tablero." });
  }
  if (!circuito) {
    errors.push({ text: "por favor escriba el circuito trabajado." });
 }
  if(lugar) { 
    errors.push({ text: "Por favor coloque el nombre del lugar trabajado." });
  }
    if(fecha) { 
      errors.push({ text: "Por favor coloque la fecha del dia trabajado." });
    }
      if (!materiales) {
        errors.push({ text: "Por favor coloque materiales utilizados." });
      }
  
  if (!descripción) {
    errors.push({ text: "Po favor agregue breve descripción del trabajo realizado" });
  }
    if (!username) {
      errors.push({ text: "Por favor coloque el usuario a cargo de pasar la tarea." });
  }
 
  if (errors.length > 0)
    return res.render("Tasks/new-tasks", {
      errors,
      nombre_tablero,
      circuito,
      lugar,
      fecha,
      descripción,
      username
    });

  const newTask = new Task({  nombre_tablero, circuito, lugar, fecha, materiales, descripción,username  });
  newTask.user = req.user.id;
  await newtasks.save();
  req.flash("success_msg", "Tarea agregada con exito!!");
  res.redirect("/tasks");
};

export const renderTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("tasks/all-tasks", { tasks });
};

export const renderEditForm = async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (task.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/tasks");
  }
  res.render("tasks/edit-task", { task });
};

export const updateTask = async (req, res) => {
  const {  nombre_tablero, circuito, lugar, fecha, materiales, descripción,username } = req.body;
  await Task.findByIdAndUpdate(req.params.id, {  nombre_tablero, circuito, lugar, fecha, materiales, descripción,username });
  req.flash("success_msg", "No se Actualizo correctamente");
  res.redirect("/tasks");
};

export const deletetask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "No se elimino correctamente");
  res.redirect("/tasks");

};
