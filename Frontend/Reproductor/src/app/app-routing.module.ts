import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "player", component: MusicControllerComponent },
  { path: "register", component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
