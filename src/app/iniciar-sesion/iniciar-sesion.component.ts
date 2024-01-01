import { Component,ViewChild, ElementRef  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService,private router:Router) { }

  onSubmit() {
    this.authService.autenticarUsuario(this.correo, this.contrasena).subscribe(
      () => {
        console.log("Sesión iniciada");
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.log("Error al iniciar sesión:", error);
        // Aquí puedes manejar el error de inicio de sesión
      }
    );
  }
}
