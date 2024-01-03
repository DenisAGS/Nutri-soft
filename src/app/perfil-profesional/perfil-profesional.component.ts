import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css']
})
export class PerfilProfesionalComponent {
  conectadoInfo: any = {}; // Cambié el nombre de la variable para reflejar la nueva consulta
  listaComentarios: string[] = [];
  nuevoComentario: string = '';
  editando = false;
  verMasClicked = false;
  opiniones: any[] = [];

  toggleEdicion(): void{

    this.editando = !this.editando;
  }

  toggleVerMas(): void {
    this.verMasClicked = !this.verMasClicked;
  }

   constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerInformacionConectado();
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
        console.log(this.conectadoInfo);
      });
  }

  abrirVentana(): void {
    const modalRef = this.modalService.open(PublicacionModalComponent, { centered: true});
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
