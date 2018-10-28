import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HuborcontComponent } from './huborcont/huborcont.component';
import { NamesComponent } from './names/names.component';
import { WaitingComponent } from './waiting/waiting.component';
import { MainComponent } from './main/main.component';
import { EndComponent } from './end/end.component';
import { GameButtonsComponent } from './game-buttons/game-buttons.component';
import { CategoryComponent } from './category/category.component';
import { RoomCreatorComponent } from './room-creator/room-creator.component';
import { RoomJoinerComponent } from './room-joiner/room-joiner.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent },
  { path: 'huborcont', component: HuborcontComponent},
  { path: 'names', component: NamesComponent},
    { path: 'waiting', component: WaitingComponent },
    { path: 'main', component: MainComponent },
    { path: 'end', component: EndComponent },
    { path: 'game-buttons', component: GameButtonsComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'create-room', component: RoomCreatorComponent},
    { path: 'join-room', component: RoomJoinerComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
