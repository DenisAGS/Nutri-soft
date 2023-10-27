import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  soyNutriologo: boolean = false;
  wrapperHeight: string = 'auto';

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      soyNutriologo: [false], // Checkbox
    });
  }

  submitRegistro() {
  if (this.registroForm.valid) {
  }
}

actualizarWrapperHeight() {
  this.wrapperHeight = this.soyNutriologo ? '70vh' : 'auto'; // Cambia la altura según sea necesario
}

}
