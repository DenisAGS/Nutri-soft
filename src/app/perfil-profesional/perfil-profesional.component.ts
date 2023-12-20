import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css']
})
export class PerfilProfesionalComponent {
  nombreUsuario = 'Obed Hipolito - Orizaba';
  cedula = '123456789';
  direccion = 'Calle principal';
  sobreMi = '¡Hola soy obed!';
  editando = false;

  toggleEdicion(): void{

    this.editando = !this.editando;
  }

  opiniones = [
    { texto: 'Primera opinión...', nombre: 'Usuario1' },
    { texto: 'Segunda opinión...', nombre: 'Usuario2' },
    { texto: 'Tercera opinión...', nombre: 'Usuario3' },
    { texto: 'Cuarta opinión...', nombre: 'Usuario4' },
    { texto: 'Quinta opinión...', nombre: 'Usuario5' },
  ];

  verMasClicked = false;

  toggleVerMas(): void {
    this.verMasClicked = !this.verMasClicked;
  }
}
