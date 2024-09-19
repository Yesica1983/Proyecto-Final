const express = require('express');
const db = require('../db'); // Importa el archivo de conexión a la base de datos
const router = express.Router();

// **Agregar Tarea**
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const result = await db.query(
      'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding task' });
  }
});

// **Leer Tareas**
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// **Actualizar Tarea**
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await db.query(
      'UPDATE tasks SET name = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [name, description, completed, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// **Eliminar Tarea**
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// **Marcar Tarea como Completada**
router.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error completing task' });
  }
});

module.exports = router;
