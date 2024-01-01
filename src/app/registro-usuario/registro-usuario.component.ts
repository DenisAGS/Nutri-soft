import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DireccionModalComponent } from '../direccion-modal/direccion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {

  soyNutriologo: boolean = false;
  wrapperHeight: string = 'auto';
  modalAbierto: boolean = false;
  direccionId: number = 0;

  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';
  cedula: number = 0;
  sobreMi: string = '';

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private router: Router,
  ) { }

  crearUsuarioNormalMutation = gql`
    mutation CreateUsuario(
      $nombresCompleto: String!
      $correo: String!
      $password: String!
      $tipoUsuario: String!
    ) {
      createUsuario(
        nombresCompleto: $nombresCompleto
        correo: $correo
        password: $password
        tipoUsuario: $tipoUsuario
      ) {
        usuario {
          correo
        }
      }
    }
  `;

  crearNutriologoMutation = gql`
    mutation CreateNutriologo(
      $nombresCompleto: String!
      $correo: String!
      $password: String!
      $cedula: String!
      $informacion: String!
      $tipoUsuario: String!
      $direccion: Int!
    ) {
      createNutriologo(
        nombresCompleto: $nombresCompleto
        correo: $correo
        password: $password
        cedula: $cedula
        informacion: $informacion
        tipoUsuario: $tipoUsuario
        direccion: $direccion
      ) {
        usuario {
          correo
        }
      }
    }
  `;

  submitRegistro() {
    const userData = {
      usuario: this.nombre,
      correo: this.correo,
      contrasenia: this.contrasenia,
      cedula: this.cedula,
      sobreMi: this.sobreMi,
      soyNutriologo: this.soyNutriologo
    };

    let selectedMutation = null;
    let variables: any = null;

    console.log('Datos del usuario:', userData);
    console.log('ID de la dirección:', this.direccionId);
    console.log(typeof this.direccionId)
    
    if (this.soyNutriologo) {
      selectedMutation = this.crearNutriologoMutation;
      variables= {
        nombresCompleto: userData.usuario,
        correo: userData.correo,
        password: userData.contrasenia,
        cedula: userData.cedula,
        informacion: userData.sobreMi,
        tipoUsuario: 'nutriologo',
        direccion: this.direccionId
      };
    } else {
      selectedMutation = this.crearUsuarioNormalMutation;
      variables = {
        nombresCompleto: userData.usuario,
        correo: userData.correo,
        password: userData.contrasenia,
        tipoUsuario: 'normal'
      };
    }

    this.apollo.mutate({
      mutation: selectedMutation,
      variables
    }).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/iniciar-sesion']);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        // Lógica para manejar errores, como mostrar un mensaje al usuario
      }
    );
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
  
      dialogRef.componentInstance.direccionCreada.subscribe((direccionId: number) => {
        console.log('ID de la dirección creada:', direccionId);
        this.direccionId = Number(direccionId);
        // Aquí puedes usar el ID de la dirección como lo necesites
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.modalAbierto = false;
      });
    }
  }
}
