const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth"); // Importa los controladores

// Ruta POST para registrar un usuario
router.post("/register", register);

// Ruta POST para iniciar sesión de usuario
router.post("/login", login);

module.exports = router;
