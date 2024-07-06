const db = require("../db");

exports.getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
exports.createTask = (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, title, description });
    }
  );
};
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, title, description });
    }
  );
};
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};

exports.marcarComoCompletada = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE tasks SET completada = NOT completada WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Estado de tarea actualizado" });
    }
  );
};

exports.filtrarBusqueda = (req, res) => {
  const { query } = req.query;
  const searchQuery = `%${query}%`;

  const sql = `
    SELECT * FROM tasks
    WHERE title LIKE ?
    OR description LIKE ?
    OR (completada = TRUE AND 'completada' LIKE ?)
    OR (completada = FALSE AND 'pendiente' LIKE ?)
  `;

  db.query(sql, [searchQuery, searchQuery, searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al buscar tareas');
    } else {
      res.status(200).json(results);
    }
  });
};

