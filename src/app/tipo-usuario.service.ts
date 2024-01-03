// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tipoUsuario: string = ''; // Asigna un valor predeterminado

  iniciarSesion(tipo: string): void {
    this.tipoUsuario = tipo;
    // Aquí puedes realizar cualquier lógica adicional que necesites después de iniciar sesión.
  }

  cerrarSesion(): void {
    this.tipoUsuario = '';
    // Otras lógicas de cierre de sesión, si es necesario.
  }

  getTipoUsuario(): string {
    return this.tipoUsuario;
  }
}