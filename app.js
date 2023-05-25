// app.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const flash = require('connect-flash');
const bodyParser = require('body-parser');

//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended:false }));
//app.use(express.static(path.join(__dirname, 'public')));


// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Inicializar la aplicación Express
const app = express();


// Conectar a MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI,{
  useNewUrlParser: true,
  useNewUrlParser:true
} );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to database!');
});
// MongoClient.connect('mongodb+srv://dperco:abc12345678@cluster0.zdpd0ie.mongodb.net/ecommerce', function(err, client) {
//   console.log("Connected successfully to server");

//   const db = client.db('ecommerce');

//   client.close();
// });
// Configurar Handlebars
app.set('views', path.join(__dirname, 'src/views'));
app.engine('handlebars',exphbs({
  defaultLayout: 'main',
  runtimeOptions: {
    allowPropertiesByDefault: true
    
  }
}));
app.set('view engine', 'handlebars');

// Middleware para procesar datos POST
app.use(express.urlencoded({ extended: false }));
const options = {
  mongoUrl: MONGODB_URI,
  // otras opciones
};   
// Configurar sesión 
app.use(session({
  secret: '12345678',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(options)
}));
 
// Configurar Passport
require('./src/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
// Configurar middleware para mensajes flash
app.use(flash());
// Usar rutas
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);


//Configur files static
app.use(express.static(path.join(__dirname, 'public'
)));


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 
app.get('/', (_req, res) => {
  res.render('index');
});
  