import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
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

/*Conexion*/
import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DireccionModalComponent } from './direccion-modal/direccion-modal.component';

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
    DireccionModalComponent
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
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'URL_DE_TU_API_GRAPHQL', // Reemplaza con la URL de tu servidor GraphQL
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { 
  /*constructor(apollo: Apollo) {
    apollo.create({});
  }'*/
}
