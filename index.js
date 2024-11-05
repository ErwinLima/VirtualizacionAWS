// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql'); // o utiliza otro driver según tu base de datos (PostgreSQL, MongoDB, etc.)

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Endpoint para obtener el total de productos
app.get('/api/totalProductos', (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM productos';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error en la consulta de la base de datos' });
            return;
        }
        res.json({ total: results[0].total });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
