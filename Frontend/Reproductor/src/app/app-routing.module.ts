import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [{path:"tutorial" , component: TutorialComponent }, {path:"principal" , component : PrincipalComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
