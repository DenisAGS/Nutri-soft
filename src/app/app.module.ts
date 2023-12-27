import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
