package com.backProducts.backProducts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.backProducts.backProducts.model.Product;

/**
 * Interfaz que define el repositorio de productos.
 * Extiende JpaRepository para obtener operaciones CRUD básicas.
 */
@EnableJpaRepositories
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
