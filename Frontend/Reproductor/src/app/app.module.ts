import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { BarrabusquedaComponent } from './barrabusqueda/barrabusqueda.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDividerModule } from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
// import { FlexLayoutModule } from '@angular/flex-layout';

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
    HttpClientModule,
    NoopAnimationsModule,
    MatListModule,
    MatProgressBarModule,
    MatGridListModule,
    MatDividerModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
