import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Connected to ", db.connection.name);
} catch (error) {
  console.error(error);
}

mongoose.connection.on("conectado!", () => {
  console.log("Conectado a Mongoose");
});

mongoose.connection.on("desconectado!", () => {
  console.log("Desconectado de Mongoose");
});