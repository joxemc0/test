// ../controllers/auth.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Importa la conexión a la base de datos

const secretKey = "your-secret-key"; // Debes tener tu propia clave secreta para JWT

// Controlador para registrar un usuario
exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al registrar usuario" });
    }
    res.json({ message: "Usuario registrado exitosamente" });
  });
};

// Controlador para iniciar sesión de usuario
exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error al intentar iniciar sesión" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login exitoso", token });
  });
};
