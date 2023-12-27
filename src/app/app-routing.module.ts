import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioPublicacionesComponent } from './inicio-publicaciones/inicio-publicaciones.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { NutriologosComponent } from './nutriologos/nutriologos.component';
import { PerfilProfesionalComponent } from './perfil-profesional/perfil-profesional.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { VistaUsuarioGeneralComponent } from './vista-usuario-general/vista-usuario-general.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  {
    path:'',
    component: InicioPublicacionesComponent
  },
  {
    path:'iniciar-sesion',
    component: IniciarSesionComponent
  },
  {
    path:'registro',
    component: RegistroUsuarioComponent
  },
  {
    path:'nosotros',
    component: NosotrosComponent
  },
  {
    path:'nutriologos',
    component: NutriologosComponent
  },
  {
    path:'perfil-profesional',
    component: PerfilProfesionalComponent
  },
  {
    path:'perfil-usuario',
    component: PerfilUsuarioComponent
  },
  {
    path:'vista-usuarios-general',
    component: VistaUsuarioGeneralComponent
  },
  {
    path:'chatbot',
    component: ChatbotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
