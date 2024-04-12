const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '../envs.yml')
dotenv.config({ path: envPath });

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // Cambiar por el usuario de tu base de datos
    password: process.env.DB_PASSWORD, // Cambiar por la contraseña de tu base de datos
    database: 'orders' // Cambiar por el nombre de tu base de datos
});

/**
 * Crea la tabla "order" en este caso, en la base de datos si aún no existe.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se ha creado la tabla.
 * @throws {Error} Si hay algún error al crear la tabla.
 */
function createOrderTable() {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS \`order\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`price\` DECIMAL(10, 2) NOT NULL,
        \`description\` TEXT,
        \`order_number\` INT NOT NULL
      )
    `;

    connection.query(sql, (err, result) => {
      if (err) reject(err);
      else {
        console.log('Tabla "order" creada o ya existente.');
        resolve();
      }
    });
  });
}

/**
 * Obtiene todas las órdenes de la base de datos.
 * @returns {Promise<Object[]>} Una promesa que se resuelve con un array de órdenes.
 * @throws {Error} Si hay algún error al obtener las órdenes.
 */
function getAllOrders() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM `order`'; // Consulta para obtener todas las órdenes

    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Mapear los resultados a objetos con el formato de la interfaz Product del Front
        const orders = results.map(row => ({
          id: row.id,
          title: row.product_title,
          price: row.price,
          description: row.description,
          cantidad: row.cantidad,
          order_number: row.order_number
        }));
        resolve(orders);
      }
    });
  });
}


/**
 * Función asíncrona para crear una nueva orden en la base de datos.
 * @param {Object} orderData - Los datos de la orden a crear.
 * @param {string} orderData.title - El título de la orden.
 * @param {number} orderData.price - El precio de la orden.
 * @param {string} orderData.description - La descripción de la orden.
 * @param {string} orderData.order_number - El número de la orden.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la nueva orden creada.
 * @throws {Error} Si hay algún error durante la creación de la orden.
 */
function createOrder(orderData) {
  return new Promise((resolve, reject) => {
    const { title, price, description, order_number } = orderData;
    const sql = 'INSERT INTO `order` (title, price, description, order_number) VALUES (?, ?, ?, ?)';
    connection.query(sql, [title, price, description, order_number], (err, result) => {
      if (err) {
        reject(err);
      } else {
        const newOrderId = result.insertId;
        const newOrder = { id: newOrderId, title, price, description, order_number };
        resolve(newOrder);
      }
    });
  });
}

// Función para obtener el total de órdenes en la base de datos
function getTotalOrders() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT SUM(order_number) AS totalOrderNumbers FROM `order`'; // Consulta para obtener la suma de los valores en la columna order_number

    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Extraer el total de la suma de los valores en la columna order_number y devolverlo
        resolve(results[0].totalOrderNumbers);
      }
    });
  });
}

// Exportar la función para crear la tabla "order"
module.exports = {
  createOrderTable,
  getAllOrders,
  createOrder,
  getTotalOrders
};