// app-perfil-profesional.component.ts

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

class Opinion {
  nombre: string;
  calificacion: number;
  comentario: string;
  fecha: string;

  constructor(nombre: string, calificacion: number, comentario: string, fecha: string) {
    this.nombre = nombre;
    this.calificacion = calificacion;
    this.comentario = comentario;
    this.fecha = fecha;
  }
}

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css']
})
export class PerfilProfesionalComponent {
  conectadoInfo: any = {};
  listaComentarios: string[] = [];
  nuevoComentario: string = '';
  editando = false;
  verMasClicked = false;
  opiniones: Opinion[] = [];
  imagenUsuario: string | ArrayBuffer | null = null;


  toggleEdicion(): void {
    this.editando = !this.editando;
  }

  toggleVerMas(): void {
    this.verMasClicked = !this.verMasClicked;
  }

  constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerInformacionConectado();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagenUsuario = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

  obtenerInformacionConectado(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query ObtenerInformacionConectado {
            conectado {
              nombresCompleto
              cedula
              direccion {
                calle
                colonia
                codigoPostal
                ciudad
              }
              informacion
              calificacionesUsuario {
                usuario {
                  nombresCompleto
                }
                calificacion
                Comentario
                fecha
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.conectadoInfo = result.data && result.data.conectado ? result.data.conectado : {};
        this.opiniones = this.conectadoInfo.calificacionesUsuario.map((opinion: any) => {
          return new Opinion(
            opinion.usuario.nombresCompleto,
            opinion.calificacion,
            opinion.Comentario,
            opinion.fecha
          );
        });
        console.log(this.conectadoInfo);
      });
  }

  abrirVentana(): void {
    const modalRef = this.modalService.open(PublicacionModalComponent, { centered: true });
  }

  toggleCheckboxSave(pubInfo: any) {
    pubInfo.isCheckedSave = !pubInfo.isCheckedSave;
  }

  agregarComentario(comentario: string) {
    if (comentario.trim() !== '') {
      this.listaComentarios.push(comentario);
      this.nuevoComentario = '';
    }
  }
}
