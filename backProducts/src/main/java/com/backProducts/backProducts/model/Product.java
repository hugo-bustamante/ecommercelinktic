package com.backProducts.backProducts.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Esta clase representa un objeto Producto en el sistema.
 * Se utiliza en la gestión de catálogos.
 */
@Entity
@AllArgsConstructor
public class Product {
	//Modelo:
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único del producto
	
	@Column
    private String title;
    
    @Column
    private Double price;
    
    @Column
    private String description;
    
    @Column
    private String image;
    
    @Column
    private Integer cantidad;
    
 // Métodos Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

}

