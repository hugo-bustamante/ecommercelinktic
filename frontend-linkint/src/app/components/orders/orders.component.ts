/**
 * Componente que muestra la lista de pedidos de productos y el total de órdenes.
 * @module OrdersComponent
 */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: Product[] = []; // Variable para almacenar los pedidos de productos
  totalOrders: number = 0; // Variable para almacenar el total de órdenes de productos

  // Instancia del servicio ApiService para realizar operaciones HTTP
  private apiService = inject(ApiService)

  constructor(){}


  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener todos los pedidos y el total de órdenes.
   */
  ngOnInit(): void {
    this.getAllOrders()
    this.getTotalOrders();
  }

  /**
   * Método para obtener todos los pedidos de productos del servicio.
   * Los pedidos obtenidos se asignan a la variable 'orders'.
   */
  getAllOrders(): void {
    this.apiService.getAllOrders().subscribe(
      (data: Product[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  /**
   * Método para obtener el total de órdenes de productos del servicio.
   * El total de órdenes se asigna a la variable 'totalOrders'.
   */
  getTotalOrders(): void {
    this.apiService.getTotalOrders().subscribe(
      (response: { totalOrderNumbers: number }) => { // Definimos el tipo de la respuesta
        this.totalOrders = response.totalOrderNumbers;
      },
      (error) => {
        console.error('Error al obtener el total de órdenes:', error);
      }
    );
  }
}
