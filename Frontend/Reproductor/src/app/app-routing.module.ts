import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadrequestComponent } from './badrequest/badrequest.component';
import { LoginComponent } from './login/login.component';
import { MusicControllerComponent } from './musiccontroller/musiccontroller.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegisterComponent } from './register/register.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "player", component: MusicControllerComponent },
  { path: "register", component: RegisterComponent },
  { path: "tutorial", component: TutorialComponent },
  { path: "principal", component: PrincipalComponent },
  { path: "badrequest", component: BadrequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
