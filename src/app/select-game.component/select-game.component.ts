import { Component, OnInit } from '@angular/core';
import {GameService} from '../game/services/game.service';
import {Game} from '../game/models/game';
import {Router} from '@angular/router';
import {ScoreService} from '../game/services/score.service';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.css']
})

export class SelectGameComponent implements OnInit {
  GAMES: Game[] = [];
  constructor(private gameService: GameService, private router: Router, public scoreService: ScoreService) { }

  async ngOnInit() {
    this.GAMES = this.gameService.games;

  }

  goToGame(game: Game) {
    this.router.navigate(['/game',  game.level]);
  }

  getScore(game: Game) {
    const score = this.scoreService.scores.scores.find( x => x.level === game.level)?.score;
    return score ? score : 0;
  }
  getTime(game: Game) {
    const time = this.scoreService.scores.scores.find( x => x.level === game.level)?.time;
    if (!time){
      return 'NOT FINISHED';
    }
    const h = Math.floor(time / 3600);
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 3600 % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;

  }

}
