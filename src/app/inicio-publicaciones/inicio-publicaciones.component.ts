import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inicio-publicaciones',
  templateUrl: './inicio-publicaciones.component.html',
  styleUrls: ['./inicio-publicaciones.component.css']
})
export class InicioPublicacionesComponent {

  tipoUsuario = localStorage.getItem('tipoUsuario') || '';
  publicaciones: any[] = [];
  idsPublicacionesGuardadas: number[] = [];
  likesPublicacion = 0;
  idPublicacion = 0;
  estaLogueado: boolean = false;
  mostrarMensaje = false;

  constructor(private apollo: Apollo, private modalService: NgbModal, private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerPublicaciones();
    this.authService.userIsLoggedIn.subscribe((LoggedIn: boolean) => {
      this.estaLogueado = LoggedIn;
    });
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

  verificarPublicacionGuardada(publicacionId:number): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    
    return this.apollo
      .watchQuery({
        query: gql`
        query {
          publicacionesGuardadas {
            publicacion {
              id
            }
          }
        }
        `,
        context: {
          headers: {
            Authorization: `JWT ${token}`
          }
        }
      })
      .valueChanges.pipe(
        map((result: any) => {
          const publicacionesGuardadas = result?.data?.publicacionesGuardadas || [];
          this.idsPublicacionesGuardadas = publicacionesGuardadas.map((guardada: any) => guardada.publicacion.id);
          return this.idsPublicacionesGuardadas.includes(publicacionId);
        })
      );
  }
  

  guardarPublicacion(publicacionId: any): void {
    if (!this.estaLogueado) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2000);
    } else {
      this.verificarPublicacionGuardada(publicacionId).subscribe((estaGuardada: boolean) => {
        if (estaGuardada) {
          console.log('La publicación ya está guardada.');
        } else {
          this.apollo.mutate({
            mutation: gql`
            mutation createPublicacionGuardada($publicacion: Int!) {
              createPublicacionguardada(publicacion: $publicacion) {
                publicacionGuardada {
                  id
                }
              }
            }
            `,
            variables: {
              publicacion: Number(publicacionId)// Asegúrate de enviar el ID de la publicación correctamente
            }
          }).subscribe((result: any) => {
            console.log('Publicación guardada:', result.data.crearPublicacion);
          }, error => {
            console.error('Error al crear la publicación:', error);
            // Aquí puedes manejar los errores si ocurren
          });
        }
      });
    }
  }

  compartir() {
    if (!this.estaLogueado) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2000);
    } else {
      console.log('compartir');
    }
  }

  seguir() {
    if (!this.estaLogueado) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2000);
    } else {
      console.log('seguir');
    }
  }
  
  private actualizarTotalLikes() {
    this.totalLikes = this.publicaciones.reduce((total, pubInfo) => total + pubInfo.likesCount, 0);
  }

  comentariosVisible = false;
  listaComentarios: string[] = [];
  nuevoComentario: string = '';

  toggleComentarios() {
    if (!this.estaLogueado) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2000);
    } else {
      this.comentariosVisible = !this.comentariosVisible;
    }
  }

  agregarComentario(comentario: string) {
    if (comentario.trim() !== '') {
      this.listaComentarios.push(comentario);
      this.nuevoComentario = '';
    }
  }


}
