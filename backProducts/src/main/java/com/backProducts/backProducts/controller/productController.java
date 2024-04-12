package com.backProducts.backProducts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backProducts.backProducts.model.Product;
import com.backProducts.backProducts.service.ProductService;

/**
 * Controlador para gestionar las peticiones relacionadas con los productos.
 * Se encarga de manejar las solicitudes HTTP y dirigirlas al servicio correspondiente.
 */

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins ="http://localhost:4200")
public class productController {
	
	@Autowired
	private ProductService productService;
	
	/**
	 * Maneja la solicitud GET para obtener todos los productos.
	 * @return Una lista de todos los productos en el sistema:
	 */
	@GetMapping
	public Iterable<Product> getAllProducts() {
		Iterable<Product> products = productService.getAllProducts();
		System.out.println("Productos recuperados del servicio: " + products);
		return products;
	}
	
	/**
	 * Maneja la solicitud POST para agregar un nuevo producto.
	 * @return El producto recién agregado.
	 */
	@PostMapping("/newproduct")
	public Product newProduct(@RequestBody Product newProduct) {
		try {
	        return this.productService.newProduct(newProduct);
		} catch (Exception e) {
	        System.err.println("Error al procesar la solicitud: " + e.getMessage());
	        e.printStackTrace();
	        throw e; // Re-lanzamos la excepción para que Spring la maneje
		}
	}
}
