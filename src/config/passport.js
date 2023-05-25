const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", 
      passwordField:"password",
       passReqToCallback:true   
  
      }, async (req, username, password, done) => {
        console.log(req.body)
        // Buscar usuario por nombre de usuario
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, {
            message: "Nombre de usuario incorrecto.",
          });
        }

        // Verificar contraseña
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Contraseña incorrecta." });
          }
        });
      }
    )
  );

  const passwordHash = {};
  passwordHash.encryptpassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      console.log(err);
    }
  };

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
