import { Component , Inject, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Variable para almacenar los productos
  product: Product | undefined; // Variable para almacenar un producto específico
  newOrder: Product | undefined; // Variable para almacenar los datos del nuevo pedido

  // Instancia del servicio ApiService para realizar operaciones HTTP
  private apiService = inject(ApiService)

  // Instancia del enrutador para la navegación entre componentes.
  private router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    this.getProducts(); // Llama al método para obtener todos los productos al inicializar el componente
  }

  /**
   * Método para obtener todos los productos del servicio.
   * Si se reciben productos, se asignan a la variable 'products'.
   * En caso contrario, se emite una advertencia.
   */
  getProducts(): void {
    this.apiService.getProducts().subscribe(
      (data: Product[]) => {
        if (data && data.length > 0) {
          this.products = data;
        }else{
          console.warn('No se han recibido productos o la respuesta está vacía.');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  /**
   * Método para navegar a la página de creación de un nuevo pedido.
   */
  getCreateOrder(): void {
    this.router.navigate(["/create-order"])
  }

}
