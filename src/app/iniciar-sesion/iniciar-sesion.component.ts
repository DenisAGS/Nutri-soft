import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent {
  correo: string = '';
  contrasena: string = '';
  showNotification: boolean = false;
  showInvalidPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.correo || !this.contrasena) {
      this.showNotification = true;
      this.showInvalidPassword = false;
    } else {
      if (this.contrasenaValida()) {
        this.authService
          .autenticarUsuario(this.correo, this.contrasena)
          .subscribe(
            () => {
              console.log('Sesión iniciada');
              this.router.navigate(['/inicio']);
            },
            (error) => {
              console.log('Error al iniciar sesión:', error);
              // Aquí puedes manejar el error de inicio de sesión
            }
          );
        this.showNotification = false;
        this.showInvalidPassword = false;
      }
      else{
      this.showInvalidPassword = true;
      }
    }
  }
  contrasenaValida(): boolean {
    return true;
}
}
