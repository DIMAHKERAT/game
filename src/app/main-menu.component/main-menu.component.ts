import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../game/services/score.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {GameService} from '../game/services/game.service';

@Component({
  selector: 'app-main-menu.compnent',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private gameService: GameService, private  angularFireAuth: AngularFireAuth, private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.angularFireAuth.user.subscribe(e => {
      this.scoreService.getUserScores(e.uid);
      this.gameService.getGames();

    });
  }


}
