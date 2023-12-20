import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-usuario-general',
  templateUrl: './vista-usuario-general.component.html',
  styleUrls: ['./vista-usuario-general.component.css']
})
export class VistaUsuarioGeneralComponent {
  nombreUsuario = 'Obed Hipolito - Orizaba';
  cedula = '123456789';
  direccion = 'Calle principal';
  sobreMi = '¡Hola soy obed!';
  editando = false;
  primerBotonVisible = true;

  nuevoComentario: { texto: string, calificacion: number } = { texto: '', calificacion: 0 };

  opiniones = [
    { texto: 'Primera opinión...', nombre: 'Usuario1',calificacion: 3 },
    { texto: 'Segunda opinión...', nombre: 'Usuario2',calificacion: 4 },
    { texto: 'Tercera opinión...', nombre: 'Usuario3',calificacion: 1 },
    { texto: 'Cuarta opinión...', nombre: 'Usuario4',calificacion: 3 },
    { texto: 'Quinta opinión...', nombre: 'Usuario5', calificacion: 5 },
  ];

  verMasClicked = false;

  toggleVerMas(): void {
    this.verMasClicked = !this.verMasClicked;
  }

  agregarComentario() {
    this.opiniones.push({
      texto: this.nuevoComentario.texto,
      calificacion: this.estrellasSeleccionadas,
      nombre: 'Nuevo Usuario',
      
    });

    this.nuevoComentario.texto = '';
    this.estrellasSeleccionadas = 0;

    this.editando = false;
  }

  toggleEditando(): void {
    this.editando = !this.editando;
  }

  /* Funciones del boton de seguir */
  siguiendo = false;

  toggleSeguir(): void {
    this.siguiendo = !this.siguiendo;
  }

  /* Funciones para calificar con estrellas */

  estrellasSeleccionadas =0;

  setRating(rating: number) {
    this.estrellasSeleccionadas = rating;
  }

  onStartHover(index: number){
    this.estrellasSeleccionadas = index;
  }

  onStartLeave(){
    this.estrellasSeleccionadas = 0;
  }
}
