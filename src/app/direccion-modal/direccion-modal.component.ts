import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-direccion-modal',
  templateUrl: './direccion-modal.component.html',
  styleUrls: ['./direccion-modal.component.css']
})
export class DireccionModalComponent {
  calle: string = '';
  ciudad: string = '';
  codigoPostal: number = 0;
  colonia: string = '';
  estado: string = '';
  numero: number = 0;
  pais: string = '';

  constructor(private dialogRef: MatDialogRef<DireccionModalComponent>) {}

  onAceptar(): void {
    this.dialogRef.close({ calle: this.calle, ciudad: this.ciudad, codigoPostal: this.codigoPostal, colonia: this.colonia, estado: this.estado, numero: this.numero, pais: this.pais });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
