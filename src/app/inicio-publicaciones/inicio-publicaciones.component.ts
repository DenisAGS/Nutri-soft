import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-publicaciones',
  templateUrl: './inicio-publicaciones.component.html',
  styleUrls: ['./inicio-publicaciones.component.css']
})
export class InicioPublicacionesComponent {
  isChecked: boolean = false;
  isCheckedsave: boolean= false ;
  likesCount: number = 4;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }
  }

  toggleCheckboxsave() {
    this.isCheckedsave = !this.isCheckedsave;
  }

  
  comentariosVisible = false;
  listaComentarios: string[] = [];
  nuevoComentario: string = '';

  toggleComentarios() {
    this.comentariosVisible = !this.comentariosVisible;
  }

  agregarComentario(comentario: string) {
    if (comentario.trim() !== '') {
      this.listaComentarios.push(comentario);
      this.nuevoComentario = ''; // Limpia el campo de entrada después de agregar el comentario
    }
  }

}
