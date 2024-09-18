// db.js
const { Pool } = require('pg');

// Configura tu conexión
const pool = new Pool({
  user: 'Posgret', 
  host: 'localhost', // Dirección del servidor PostgreSQL
  database: 'tu_base_de_datos', // Nombre de tu base de datos
  password: 'ezequiel',
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
