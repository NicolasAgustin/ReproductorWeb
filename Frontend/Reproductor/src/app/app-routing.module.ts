import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { PrincipalComponent } from './principal/principal.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [{path:"tutorial" , component: TutorialComponent }, {path:"principal" , component : PrincipalComponent}];
=======
import { LoginComponent } from './login/login.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "player", component: MusicControllerComponent },
  { path: "register", component: RegisterComponent }

];
>>>>>>> 599b7d155950574068ef39ac01f999a148f9c0e7

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
