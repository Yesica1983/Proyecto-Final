const pool = require('./db'); // Asegúrate de que la ruta sea correcta

// Prueba la conexión ejecutando una consulta simple
async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa:', result.rows[0]);
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
}

testConnection();
