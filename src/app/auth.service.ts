import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariosRegistrados = [
    { usuario: 'usuario1', contrasena: '1234' },
    { usuario: 'usuario2', contrasena: '123456' },
  ];

  verificarUsuarioRegistrado(usuario: string): boolean {
    return this.usuariosRegistrados.some(u => u.usuario === usuario);
  }

  autenticarUsuario(usuario: string, contrasena: string): boolean {
    // Lógica de autenticación real aquí
    return this.usuariosRegistrados.some(u => u.usuario === usuario && u.contrasena === contrasena);
  }
  
  constructor() { }
}
