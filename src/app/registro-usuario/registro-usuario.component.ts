import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DireccionModalComponent } from '../direccion-modal/direccion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private apollo: Apollo) {
    this.registroForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      soyNutriologo: [false], // Checkbox
    });
  }

  submitRegistro() {
    if (this.registroForm.valid) {
      const userData = this.registroForm.value;
  
      let mutationQuery = '';
      let mutationName = '';
      let variables: any = {
        nombresCompleto: userData.usuario,
        correo: userData.correo,
        password: userData.contrasenia,
        tipoUsuario: userData.soyNutriologo ? 'nutriologo' : 'normal'
      };
  
      if (userData.soyNutriologo) {
        mutationName = 'createNutriologo';
        variables = {
          ...variables,
          cedula: userData.cedula,
          informacion: userData.sobreMi
        };
      } else {
        mutationName = 'createUsuario';
      }
  
      this.apollo.mutate({
        mutation: gql`
          mutation($nombresCompleto: String!, $correo: String!, $password: String!, $tipoUsuario: String!, $cedula: String, $informacion: String) {
            ${mutationName}(
              nombresCompleto: $nombresCompleto,
              correo: $correo,
              password: $password,
              tipoUsuario: $tipoUsuario,
              cedula: $cedula,
              informacion: $informacion
            ) {
              id
              nombresCompleto
              correo
            }
          }
        `,
        variables
      }).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          // Lógica adicional después de crear el usuario, como redireccionar a otra página
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          // Lógica para manejar errores, como mostrar un mensaje al usuario
        }
      );
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
