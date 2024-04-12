/**
 * Componente para la creación de un nuevo producto.
 * @module CrateProductComponent
 */

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crate-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crate-product.component.html',
  styleUrl: './crate-product.component.css'
})
export class CrateProductComponent implements OnInit{

  // Formulario para crear un nuevo producto
  productForm!: FormGroup;

  // Constructor de formularios para la creación del formulario
  private formBuilder = inject(FormBuilder)

  // Instancia del servicio ApiService para realizar operaciones HTTP
  private apiService = inject(ApiService)

  // Instancia del servicio ToastrService para mostrar mensajes emergentes
  private toast = inject(ToastrService)

  // Instancia del enrutador para la navegación entre componentes
  private router = inject(Router)


  constructor() { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de creación de producto.
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Método privado para inicializar el formulario de creación de producto.
   * Establece las validaciones y los campos del formulario.
   */
  private initForm(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['']
    });
  }

  /**
   * Método para manejar el envío del formulario de creación de producto.
   * Si el formulario es válido, se envía el producto al servidor.
   * Se muestra un mensaje de éxito o error y se redirige al usuario según corresponda.
   */
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        title: this.productForm.value.title,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.image
      };
      this.apiService.newProduct(newProduct).subscribe(
        (response) => {
          this.toast.success('Producto creado', 'LinkTic')
        },
        (error) => {
          this.toast.error('Error al crear la orden', 'LinkTic')
          this.router.navigate(['/home'])
        }
      );
      // Limpia el formulario después de enviar
      this.productForm.reset();
    } else {
      // Marca los campos como tocados para mostrar mensajes de error si es necesario
      this.productForm.markAllAsTouched();
    }
  }
}
