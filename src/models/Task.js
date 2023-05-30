import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    nombre_tablero: { type: String, required: true },
    circuito: { type: String, required: true },
    lugar: { type: String, required: true },
    fecha: { type: Date, required: true },
    user: { type: String, required: true },
    descripcion: { type: String, },
    materiales: { type: String, required: true}
});


  export default mongoose.model('Task', TaskSchema);
