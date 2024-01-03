import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  nombreUsuario = 'Obed Hipolito - Orizaba';
  correoUsuario = 'denise@gmail.com';

  

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
      isCheckedSave: false 
    },
  ];

    toggleCheckboxSave(pubInfo: any) {
    pubInfo.isCheckedSave = !pubInfo.isCheckedSave;
  }
}
