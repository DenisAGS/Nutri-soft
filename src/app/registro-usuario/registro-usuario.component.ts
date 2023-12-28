import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DireccionModalComponent } from '../direccion-modal/direccion-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  soyNutriologo: boolean = false;
  wrapperHeight: string = 'auto';

  modalAbierto: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
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
    this.wrapperHeight = this.soyNutriologo ? '70vh' : 'auto';
  }

  abrirModalDireccion(): void {
    if (this.modalAbierto) {
      alert('Ya hay una ventana abierta');
    } else {
      this.modalAbierto = true;
      const dialogRef = this.dialog.open(DireccionModalComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Dirección ingresada:', result);
        }
        this.modalAbierto = false;
      });
    }
  }
}
