import { Component, OnInit } from '@angular/core';
import {GameService} from '../game/services/game.service';
import {Game} from '../game/models/game';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.css']
})

export class SelectGameComponent implements OnInit {
  GAMES: Game[] = [];
  // loadingSubject$: Subject<boolean> = new Subject<boolean>();
  constructor(private gameService: GameService, private router: Router) { }

  async ngOnInit() {
    console.log('aaa');
    this.GAMES = await this.gameService.getGames();

    // this.loadingSubject$.next(true);
    console.log('ccc');
  }

  goToGame(game: Game) {
    this.router.navigate(['/game',  game.level]);
    // this.loadingSubject$.unsubscribe();

  }
}
