import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TurnService } from '../turn.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {
  private room;
  private nameSubscripton: Subscription;
  private commandSubscription: Subscription;

  constructor(
    private controller: ControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private turn: TurnService) { }

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');
    this.commandSubscription = this.controller.getCommand(this.room).subscribe((command: string) => {
      if(command == 'category'){
        this.nameSubscripton = this.controller.getNames(this.room).subscribe(playerNames => {
          this.turn.setPlayerNames(playerNames);
          this.router.navigate(['/category', this.room]);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.nameSubscripton.unsubscribe();
    this.commandSubscription.unsubscribe();
  }

}
