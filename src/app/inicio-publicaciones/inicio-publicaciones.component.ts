import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-publicaciones',
  templateUrl: './inicio-publicaciones.component.html',
  styleUrls: ['./inicio-publicaciones.component.css']
})
export class InicioPublicacionesComponent {
  listaPubInfo = [
    {
      nombre: 'Obeb Hipolito - Orizaba',
      especialidad: 'Especialidad Nutricion',
      fecha: '10/08/23',
      titulo: '¡Tips para tener un dia lleno de energia!',
      contenido: [
        'Dormir lo suficiente: Dormir entre 7 y 9 horas por noche es esencial para recuperar la energía física y mental',
        'Desayunar bien: Un desayuno equilibrado, rico en proteínas, fibra y carbohidratos saludables, te proporcionará la energía necesaria para comenzar el día.',
        'Hidratación: Mantenerse hidratado es clave para tener energía durante todo el día. Se recomienda beber al menos 8 vasos de agua al día.'
      ],

      isChecked: false,
      likesCount: 0,
      isCheckedSave: false 
    },
    {
      nombre: 'Obeb Hipolito - Orizaba',
      especialidad: 'Especialidad Nutricion',
      fecha: '10/08/23',
      titulo: '¡Tips para tener un dia lleno de energia!',
      contenido: [
        'Dormir lo suficiente: Dormir entre 7 y 9 horas por noche es esencial para recuperar la energía física y mental',
        'Desayunar bien: Un desayuno equilibrado, rico en proteínas, fibra y carbohidratos saludables, te proporcionará la energía necesaria para comenzar el día.',
        'Hidratación: Mantenerse hidratado es clave para tener energía durante todo el día. Se recomienda beber al menos 8 vasos de agua al día.'
      ],

      isChecked: false,
      likesCount: 2,
      isCheckedSave: false 
    },
  ];

  totalLikes = 0;


  toggleCheckbox(pubInfo: any) {
    pubInfo.isChecked = !pubInfo.isChecked;
    pubInfo.likesCount += pubInfo.isChecked ? 1 : -1;

    this.actualizarTotalLikes();
  }

  toggleCheckboxSave(pubInfo: any) {
    pubInfo.isCheckedSave = !pubInfo.isCheckedSave;
  }
  
  private actualizarTotalLikes() {
    this.totalLikes = this.listaPubInfo.reduce((total, pubInfo) => total + pubInfo.likesCount, 0);
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
