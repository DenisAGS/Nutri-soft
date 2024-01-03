import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Component({
  selector: 'app-inicio-publicaciones',
  templateUrl: './inicio-publicaciones.component.html',
  styleUrls: ['./inicio-publicaciones.component.css']
})
export class InicioPublicacionesComponent {

  publicaciones: any[] = [];
  likesPublicacion = 0;
  idPublicacion = 0;

  constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query ObtenerPublicaciones {
            publicaciones {
              id
              Usuario {
                nombresCompleto
                direccion {
                  ciudad
                }
              }
              fecha
              likes
              urlImagen
              titulo
              contenido
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.publicaciones = result.data && result.data.publicaciones ? result.data.publicaciones : [];
        console.log(this.publicaciones);
      });
  }

  totalLikes = 0;

  abrirVentana(): void {
    const modalRef = this.modalService.open(PublicacionModalComponent, { centered: true});
  }

  toggleCheckbox(pubInfo: any) {
    pubInfo.isChecked = !pubInfo.isChecked;
    pubInfo.likesCount += pubInfo.isChecked ? 1 : -1;

    this.actualizarTotalLikes();
  }

  toggleCheckboxSave(pubInfo: any) {
    pubInfo.isCheckedSave = !pubInfo.isCheckedSave;
  }
  
  private actualizarTotalLikes() {
    this.totalLikes = this.publicaciones.reduce((total, pubInfo) => total + pubInfo.likesCount, 0);
  }

  comentariosVisible = false;
  listaComentarios: string[] = [];
  nuevoComentario: string = '';

  toggleComentarios() {
    this.comentariosVisible = !this.comentariosVisible;
  }

  agregarComentario(comentario: string) {
    if (comentario.trim() !== '') {
      this.listaComentarios.push(comentario);
      this.nuevoComentario = '';
    }
  }

}
