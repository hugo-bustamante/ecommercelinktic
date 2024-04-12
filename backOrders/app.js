/**
 * Módulo principal de la aplicación que configura y arranca el servidor Express.
 * También gestiona la configuración de CORS y las rutas de la API.
 * @module app
 */
const express = require('express');
const cors = require('cors');
const orderModel = require('./models/order');
const orderRouter = require('./routes/ordersRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// Parsear el cuerpo de las solicitudes HTTP como JSON con un límite de 50mb
app.use(express.json({ limit: '50mb' }));

// Llamada para crear la tabla "order" en este caso, y luego iniciar el servidor
orderModel.createOrderTable()
  .then(() => {
    console.log('Tabla creada o ya existente. Iniciando el servidor...');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al crear la tabla "order":', err);
    process.exit(1);
  });

// Configuración de CORS para permitir solo ciertos origenes
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));


/**
 * Ruta inicial que devuelve un saludo como respuesta.
 * @function
 * @name GET /
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {string} - Mensaje de saludo.
 */
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

// Middleware para manejar las rutas relacionadas con la API de productos
app.use('/api/products', orderRouter )
module.exports = app