import { Component,ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  usuarioRegistrado = false; 
  @ViewChild('loginForm',  { static: false }) loginForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  validarInicioSesion() {
    const usuario = this.loginForm.value.usuario;
    const contrasena = this.loginForm.value.contrasena;

    this.usuarioRegistrado = this.authService.verificarUsuarioRegistrado(usuario);

    if (this.usuarioRegistrado && this.authService.autenticarUsuario(usuario, contrasena)) {
      alert('Inicio de sesión exitoso');
      // Redireccionar a la página correspondiente
      this.router.navigate(['/']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
