const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/login',
  failureFlash: true
});

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  //console.log(req.body);
  const { username, password } = req.body;
  let errors = [];
  //console.log(username,password);
  if (!username || !password) {
    errors.push({ msg: 'Por favor ingrese todos los campos.' });
  }
  //console.log(password.length);
  if (password.length < 6) {
    errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres.' });
  }

  if (errors.length > 0) {
    res.render('register', { 
      errors,
      username,
      password
    });
  } else {
    //console.log(username);
    const user = await User.findOne({ username });
    //console.log(user);
    if (user) {
      //console.log('user registrado');
      errors.push({ msg: 'El nombre de usuario ya está registrado.' });
      res.render('register', {
        errors,
        username,
        password  
      });
    } else {
      const newUser = new User({ username, password });
      console.log(newUser);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          newUser.password = hash;
          await newUser.save();
          req.flash('success_msg', 'Te has registrado con éxito y ahora puedes iniciar sesión.');
          res.redirect('/login');
        }); 
      });
    }
  } 
};

const handleErrors = (err) => {
  if (err) {
   
    console.error(err);
    res.status(500).json({ message: 'Ha ocurrido un error al registrarse. Por favor, inténtelo de nuevo más tarde.' });
    // Aquí podrías agregar código adicional para manejar el error, como enviar una respuesta de error al cliente o registrar el error en un archivo de registro.
    req.flash('error_msg', 'Ha ocurrido un error al registrarse. Por favor, inténtelo de nuevo más tarde.');
    res.redirect('/register');
  }
};


exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'Has cerrado sesión.');
  res.redirect('/login');
}; 
