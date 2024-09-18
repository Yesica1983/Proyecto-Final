const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks'); // Importa las rutas de tareas

const app = express();
const port = 3000;

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar JSON
app.use(bodyParser.json());

// Usar las rutas de tareas
app.use('/api/tasks', tasksRouter);

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
