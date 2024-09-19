// db.js
const { Pool } = require('pg');

// Configura tu conexión
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mi_base_de_datos',
  password: 'ezequiel',
  port: 5432,
});

// Verifica la conexión al iniciar
pool.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
