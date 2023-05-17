const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    nombre_tablero: { type: String, required: true },
    circuito: { type: String, required: true },
    lugar: { type: String, required: true },
    fecha: { type: Date, required: true },
    username: { type: String, ref: 'User', required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);