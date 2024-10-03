const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Inicializa la aplicación Express
const port = 3000;

// Middleware para manejar CORS
app.use(cors()); // Permitir CORS para todas las rutas

// Middleware para manejar JSON
app.use(bodyParser.json());

// Importa las rutas de tareas
const tasksRouter = require('./routes/tasks');

// Usar las rutas de tareas
app.use('/api/tasks', tasksRouter);

// Opción: Mensaje en la ruta raíz
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
