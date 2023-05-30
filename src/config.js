import { config } from "dotenv";
config();




// Iniciar el servidor
export const PORT = process.env.PORT || 3000;

  

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
//
// Configurar sesión 
app.use(session({
  secret: '12345678',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(options)
}));
 
