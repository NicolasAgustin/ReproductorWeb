import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { BarrabusquedaComponent } from './barrabusqueda/barrabusqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaCancionesComponent,
    BarrabusquedaComponent
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
