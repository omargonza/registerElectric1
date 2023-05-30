import {Router} from "express";
import {
  renderRegisterForm,
  register,
  renderLoginForm,
  login,
  logout
} from "../controllers/auth.controllers.js";

const router = Router();

// Routes

router.get("/auth/register", renderRegisterForm);

router.post("/auth/register", register);

router.get("/auth/login", renderLoginForm);

router.post("/auth/login", login);

router.get("/auth/logout", logout);

export default router;
