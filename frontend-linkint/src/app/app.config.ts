import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// Configuración de la aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor para las animaciones
    provideAnimations(),
    // Proveedor para las notificaciones Toastr
    provideToastr({preventDuplicates: true, positionClass : 'toast-bottom-left'}),
    // Proveedor para el enrutamiento de la aplicación
    provideRouter(routes),
    // Proveedor para la hidratación del cliente
    provideClientHydration(),
    // Proveedor para el cliente HTTP
    provideHttpClient()]
};
