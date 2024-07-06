const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskControllers');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id/completada', taskController.marcarComoCompletada);
router.get('/filtrar', taskController.filtrarBusqueda);
module.exports = router;