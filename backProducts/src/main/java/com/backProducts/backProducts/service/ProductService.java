package com.backProducts.backProducts.service;

import com.backProducts.backProducts.model.Product;

//Interfaz con metodos que se van a implementar en el servicio para la logica de negocio:
public interface ProductService {
	
	Product newProduct(Product newProduct);
	Iterable<Product> getAllProducts();

}
