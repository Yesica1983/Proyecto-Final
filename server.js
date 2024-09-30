const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors

const app = express(); // Inicializa la aplicación Express
const port = 3000;

// Middleware para manejar CORS
app.use(cors()); // Permitir CORS para todas las rutas

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar JSON
app.use(bodyParser.json());

// Importa las rutas de tareas
const tasksRouter = require('./routes/tasks');

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
