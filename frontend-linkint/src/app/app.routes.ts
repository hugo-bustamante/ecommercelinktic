import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrateProductComponent } from './components/crate-product/crate-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { AgradecimientoComponent } from './components/agradecimiento/agradecimiento.component';

// Sistema de rutas
export const routes: Routes = [
    {path: 'home' , component: InicioComponent},
    {path: 'create-product', component: CrateProductComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'create-order', component: CreateOrderComponent},
    {path: 'agradecimiento', component: AgradecimientoComponent},
    {path: '**' , redirectTo: 'home' , pathMatch: 'full'}
]
