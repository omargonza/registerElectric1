exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Por favor inicie sesión para ver esta página.');
    res.redirect('/login');
  };
  