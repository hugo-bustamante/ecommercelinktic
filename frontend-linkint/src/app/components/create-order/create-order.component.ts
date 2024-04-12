/**
 * Componente para crear una nueva orden de producto.
 * @module CreateOrderComponent
 */

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {

  // Formulario para crear una nueva orden
  orderForm!: FormGroup;

  //Constructor de formularios para la creación del formulario
  private formBuilder = inject(FormBuilder)

  // Instancia del servicio ApiService para realizar operaciones HTTP
  private apiService = inject(ApiService)

  // Instancia del enrutador para la navegación entre componentes
  private router = inject(Router)

  // Instancia del servicio ToastrService para mostrar mensajes emergentes
  private toast = inject(ToastrService)

  constructor() { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de creación de orden.
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Método privado para inicializar el formulario de creación de orden.
   * Establece las validaciones y los campos del formulario.
   */
  private initForm(): void {
    this.orderForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      order_number: ['', [Validators.required]]
    });
  }

  /**
   * Método para manejar el envío del formulario de creación de orden.
   * Si el formulario es válido, se envía la orden al servidor.
   * Se muestran mensajes de éxito o error y se redirige al usuario según corresponda.
   */
  onSubmit(): void {
    if (this.orderForm.valid) {
      const newOrder: Product = {
        title: this.orderForm.value.title,
        price: this.orderForm.value.price,
        description: this.orderForm.value.description,
        order_number: this.orderForm.value.order_number
      };
      this.apiService.createOrder(newOrder).subscribe(
        (response) => {
          this.toast.success('Orden creada', 'LinkTic')
          this.router.navigate(['/home'])
        },
        (error) => {
          this.toast.error('Error al crear la orden', 'LinkTic')
          this.router.navigate(['/home'])
        }
      );
      // Limpia el formulario después de enviar
      this.orderForm.reset();
    } else {
      // Marca los campos como tocados para mostrar mensajes de error si es necesario
      this.orderForm.markAllAsTouched();
    }
  }
}
