import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HuborcontComponent } from './huborcont/huborcont.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/HubOrCont', pathMatch: 'full'},
    { path: 'huborcont', component: HuborcontComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
