import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


interface CreateDireccionResponse {
  createDireccion: {
    direccion: {
      id: number;
    };
  };
}
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

  constructor(private apollo: Apollo, private dialogRef: MatDialogRef<DireccionModalComponent>) {}

  onAceptar(): void {
    if (this.calle && this.ciudad && this.codigoPostal && this.colonia && this.estado && this.numero && this.pais) {
      this.realizarMutationGraphQL();
    } else {
      console.error('Por favor, complete todos los campos antes de enviar.');
    }
  }

  @Output() direccionCreada: EventEmitter<number> = new EventEmitter<number>();

  direccionId: number | undefined;
  realizarMutationGraphQL(): void {
    const mutation = gql`
      mutation CreateDireccion(
        $calle: String!
        $ciudad: String!
        $codigoPostal: Int!
        $colonia: String!
        $estado: String!
        $numero: Int!
        $pais: String!
      ) {
        createDireccion(
          calle: $calle
          ciudad: $ciudad
          codigoPostal: $codigoPostal
          colonia: $colonia
          estado: $estado
          numero: $numero
          pais: $pais
        ) {
          direccion {
            id
          }
        }
      }
    `;

    this.apollo.mutate<CreateDireccionResponse>({
      mutation,
      variables: {
        calle: this.calle,
        ciudad: this.ciudad,
        codigoPostal: this.codigoPostal,
        colonia: this.colonia,
        estado: this.estado,
        numero: this.numero,
        pais: this.pais
      }
    }).subscribe((result) => {
      this.direccionId = result?.data?.createDireccion?.direccion?.id;
      console.log('ID de la dirección creada:', this.direccionId);
      this.direccionCreada.emit(this.direccionId)
      this.dialogRef.close();
    });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
