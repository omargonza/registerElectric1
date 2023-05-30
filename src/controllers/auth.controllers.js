
import User from "../models/User.js";
import passport from "passport";

export const renderRegisterForm = (req, res) => res.render("auth/register");

export const register = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "La contraseña no coincide." });
  }

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("auth/register", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Buscar coincidencia para el correo electrónico
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "El correo electronico ya esta en uso.");
    return res.redirect("/auth/register");
  }

  // Guarda un nuevo usuario
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Estas registrado.");
  res.redirect("/auth/login");
};

export const renderLoginForm = (req, res) => res.render("auth/login");

export const signin = passport.authenticate("local", {
  successRedirect: "/tasks",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Estas desconectado.");
    res.redirect("/auth/login");
  });
};

