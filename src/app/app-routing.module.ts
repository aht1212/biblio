import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { AuteurComponent } from './modules/components/auteur/auteur.component';
import { EmpruntComponent } from './modules/components/emprunt/emprunt.component';
import { HomeComponent } from './modules/components/home/home.component';
import { LivreComponent } from './modules/components/livre/livre.component';
import { LoginComponent } from './modules/components/login/login.component';

const routes: Routes = [
  {path: '',
   component: DefaultComponent,
   children: [{
     path: 'home',
     component: HomeComponent
   },
  {
    path: 'livre',
    component: LivreComponent
  },

  {
    path: 'auteur',
    component: AuteurComponent
  },
  {
    path: 'emprunt',
    component: EmpruntComponent
  }]
},
{
  path:'login',
  component: LoginComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
