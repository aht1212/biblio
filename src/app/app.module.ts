import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullwidthModule } from './layout/fullwidth/fullwidth.module';
import { DefaultModule } from './layout/default/default.module';
import { HomeComponent } from './modules/components/home/home.component';
import { EmpruntComponent } from './modules/components/emprunt/emprunt.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoriqueComponent } from './modules/components/historique/historique.component';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullwidthModule,
    DefaultModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
