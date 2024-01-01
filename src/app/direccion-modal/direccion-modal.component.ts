import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
  direcciones: any[] = [];

  constructor(private dialogRef: MatDialogRef<DireccionModalComponent>, private apollo: Apollo) {}

  ngOnInit(): void {
    this.realizarConsultaDirecciones();
  }

  realizarConsultaDirecciones(): void {
    const consultaDirecciones = gql`
      query MyQuery {
        direcciones {
          calle
          ciudad
          codigoPostal
          colonia
          estado
          numero
          id
          pais
        }
      }
    `;

    this.apollo
      .query<{ direcciones: any[] }>({
        query: consultaDirecciones,
        fetchPolicy: 'no-cache',
      })
      .subscribe(
        ({ data, loading }) => {
          this.direcciones = data.direcciones;
          console.log('Consulta de direcciones exitosa:', data);
        },
        (error) => {
          console.error('Error en la consulta de direcciones:', error);
          if (error.networkError) {
            console.error('Error de red:', error.networkError);
          }
        }
      );
  }

  realizarMutationGraphQL(): void {
    const mutation = gql`
      mutation CrearDireccion(
        $calle: String!,
        $ciudad: String!,
        $codigoPostal: Int!,
        $colonia: String!,
        $estado: String!,
        $numero: Int!,
        $pais: String!
      ) {
        createDireccion(
          input:{
            calle: $calle,
            ciudad: $ciudad,
            codigoPostal: $codigoPostal,
            colonia: $colonia,
            estado: $estado,
            numero: $numero,
            pais: $pais
          }
        ) {
          direccion {
            id
            calle
            ciudad
            codigoPostal
            colonia
            estado
            numero
            pais
          }
        }
      }
    `;
  
    const variables = {
      calle: this.calle,
      ciudad: this.ciudad,
      codigoPostal: this.codigoPostal,
      colonia: this.colonia,
      estado: this.estado,
      numero: this.numero,
      pais: this.pais
    };
  
    this.apollo
      .mutate({
        mutation,
        variables
      })
      .subscribe(
        (result) => {
          console.log('Mutación exitosa:', result);
  
          this.realizarConsultaDirecciones();
  
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error en la mutación:', error);
  
          if (error.networkError) {
            console.error('Error de red:', error.networkError);
          }
          console.error('Detalles del error:', error.message);
        }
      );
  }

  onAceptar(): void {
    if (this.calle && this.ciudad && this.codigoPostal && this.colonia && this.estado && this.numero && this.pais) {
      this.realizarMutationGraphQL();
    } else {
      console.error('Por favor, complete todos los campos antes de enviar.');
    }
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
