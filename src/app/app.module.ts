import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioPublicacionesComponent } from './inicio-publicaciones/inicio-publicaciones.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HeaderInicioComponent } from './header-inicio/header-inicio.component';
import { NutriologosComponent } from './nutriologos/nutriologos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PerfilProfesionalComponent } from './perfil-profesional/perfil-profesional.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { VistaUsuarioGeneralComponent } from './vista-usuario-general/vista-usuario-general.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule, ToastrService } from 'ngx-toastr';


/*Conexion*/
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DireccionModalComponent } from './direccion-modal/direccion-modal.component';
import { GraphQLModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';
import { ApolloClientOptions } from '@apollo/client/core';
import { PublicacionModalComponent } from './publicacion-modal/publicacion-modal.component';
import { AuthInterceptor } from './auth-interceptor';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ModalPerfilComponent } from './modal-perfil/modal-perfil.component';

const uri = 'http://127.0.0.1:8000/graphql/'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    InicioPublicacionesComponent,
    IniciarSesionComponent,
    RegistroUsuarioComponent,
    HeaderInicioComponent,
    NutriologosComponent,
    NosotrosComponent,
    PerfilProfesionalComponent,
    PerfilUsuarioComponent,
    VistaUsuarioGeneralComponent,
    ChatbotComponent,
    DireccionModalComponent,
    PublicacionModalComponent,
    EditarUsuarioComponent,
    ModalPerfilComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    GraphQLModule,
    DragDropModule,
    ReactiveFormsModule,
    ToastrModule.forRoot( { positionClass: 'toast-top-center' }),
    
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: HTTP_INTERCEPTORS
      , useClass: AuthInterceptor
      , multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { 
  /*constructor(apollo: Apollo) {
    apollo.create({});
  }'*/
}
