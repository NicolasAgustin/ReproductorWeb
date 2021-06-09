import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { BarrabusquedaComponent } from './barrabusqueda/barrabusqueda.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaCancionesComponent,
    BarrabusquedaComponent,
    MusicControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
