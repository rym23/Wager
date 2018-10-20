import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HuborcontComponent } from './huborcont/huborcont.component';
import { NamesComponent } from './names/names.component';
import { WaitingComponent } from './waiting/waiting.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent },
  { path: 'huborcont', component: HuborcontComponent},
  { path: 'names', component: NamesComponent}
    { path: 'waiting', component: WaitingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
