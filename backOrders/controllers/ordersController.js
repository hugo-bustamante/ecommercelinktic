/**
 * Este módulo contiene los controladores para manejar las solicitudes relacionadas con las órdenes.
 * Los controladores interactúan con el modelo de orden para realizar operaciones en la base de datos.
 */
const orderModel = require('../models/order');

/**
 * Controlador para obtener todas las órdenes almacenadas en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {JSON} - JSON que contiene todas las órdenes recuperadas de la base de datos.
 * @throws {Error} - Si ocurre un error al intentar obtener las órdenes.
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
};

/**
 * Controlador para crear una nueva orden en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos de la nueva orden.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {JSON} - JSON que contiene los detalles de la nueva orden creada.
 * @throws {Error} - Si ocurre un error al intentar crear la nueva orden.
 */
exports.createOrder = async (req, res) => {
  try {
    const { title, price, description, order_number } = req.body; // Obtener los datos del cuerpo de la solicitud
    const newOrder = await orderModel.createOrder({ title, price, description, order_number }); // Crear la nueva orden en el modelo
    res.status(201).json(newOrder); // Devolver la nueva orden creada
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

/**
 * Controlador para obtener el total de órdenes almacenadas en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {JSON} - JSON que contiene el total de órdenes almacenadas.
 * @throws {Error} - Si ocurre un error al intentar obtener el total de órdenes.
 */
exports.getTotalOrders = async (req, res) => {
  try {
    const totalOrderNumbers = await orderModel.getTotalOrders();
    res.json({ totalOrderNumbers });
  } catch (error) {
    console.error('Error al obtener el total de la suma de los valores en la columna order_number:', error);
    res.status(500).json({ error: 'Error al obtener el total de la suma de los valores en la columna order_number' });
  }
};