var express = require('express')
const router = express.Router();
const productsController = require('../controllers/ordersController');

// Ruta para obtener todas las órdenes
router.get('/orders', productsController.getAllOrders);

router.post('/order-create', productsController.createOrder);

// Ruta para obtener el total de órdenes
router.get('/totalorders', productsController.getTotalOrders);

module.exports = router;