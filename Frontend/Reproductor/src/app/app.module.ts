import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { PrincipalComponent } from './principal/principal.component';
import { TutorialComponent } from './tutorial/tutorial.component';
=======
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { BarrabusquedaComponent } from './barrabusqueda/barrabusqueda.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { OverlayModule } from '@angular/cdk/overlay';

// import { FlexLayoutModule } from '@angular/flex-layout';
>>>>>>> 599b7d155950574068ef39ac01f999a148f9c0e7

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    PrincipalComponent,
    TutorialComponent
=======
    ListaCancionesComponent,
    BarrabusquedaComponent,
    MusicControllerComponent,
    LoginComponent,
    RegisterComponent
>>>>>>> 599b7d155950574068ef39ac01f999a148f9c0e7
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
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule, 
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
