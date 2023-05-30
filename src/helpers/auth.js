exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // El usuario está autenticado
      return next();
    }
      // El usuario no está autenticado, redirigir a la página de inicio de sesión o mostrar un mensaje de error
    req.flash('No Autorizado.');
    res.redirect('/users/login');
  };
  