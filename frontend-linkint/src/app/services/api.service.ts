/**
 * Servicio que proporciona métodos para interactuar con los servicios backend a través de peticiones HTTP.
 * @module ApiService
 */
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Product } from '../models/product.model';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL del servicio backend para el catálogo de productos
  private urlCatalog;
  // URL del servicio backend para los pedidos
  private urlOrders;
  // Instancia del cliente HTTP para realizar peticiones
  private http = inject(HttpClient)

  constructor() {
    this.urlCatalog = GLOBAL.urlCatalog
    this.urlOrders = GLOBAL.urlOrders
  }

  /**
   * Método para obtener todos los productos del catálogo.
   * @returns {Observable<Product[]>} - Observable que emite un array de productos.
   */
  getProducts():Observable<Product[]>{
    //console.log('Enviando solicitud para obtener productos...');
    return this.http.get<Product[]>(this.urlCatalog)
  }

  /**
   * Método para agregar un nuevo producto al catálogo.
   * @param {Product} product - Objeto del producto a agregar.
   * @returns {Observable<Product>} - Observable que emite el producto agregado.
   */
  newProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Product>(`${this.urlCatalog}/newproduct`, product, { headers: headers });
  }

  /**
   * Método para obtener todos los pedidos de productos.
   * @returns {Observable<Product[]>} - Observable que emite un array de productos pedidos.
   */
  getAllOrders():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlOrders}/orders`);
  }

  /**
   * Método para obtener el total de pedidos de productos.
   * @returns {Observable<{totalOrderNumbers: number}>} - Observable que emite un objeto con el total de pedidos.
   */
  getTotalOrders():Observable<{totalOrderNumbers: number}> {
    return this.http.get<{ totalOrderNumbers: number }>(`${this.urlOrders}/totalorders`);
  }

  /**
   * Método para crear un nuevo pedido de producto.
   * @param {Product} pedido - Objeto del pedido a crear.
   * @returns {Observable<any>} - Observable que emite el resultado de la creación del pedido.
   */
  createOrder(pedido: Product) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.urlOrders}/order-create`, pedido, { headers: headers });
  }
}
