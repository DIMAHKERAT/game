import {Component, OnInit} from '@angular/core';

import {Atom, Clause} from './clause.model';
import {GameParser} from './game.parser.module';
import {GameIcons} from './gameIcons';
import {GameColor} from './gameColor';
import {ActivatedRoute} from '@angular/router';
import {GameService} from './services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private score = 0;
  private clauses: Clause[] = [];
  public form: Atom[][] = [];
  public icons;
  public tempclauses: Atom[] = [];
  public MAX_N = 0;
  public MAX_M = 0;
  private ATOUMS_COUNT: number;
  private propagate: boolean;
  private color: GameColor;

  constructor(private gameService: GameService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log('this is params', params.id);
      const gameParser = new GameParser(this.gameService.getGame(params.id));
      this.propagate = false;
      this.color = GameColor.WINNING;
      this.clauses = gameParser.getClauses();
      this.ATOUMS_COUNT = 0;
      this.clauses.forEach(e => this.ATOUMS_COUNT += +e.getAtomsCount());
      this.icons = GameIcons;

      this.clauses.forEach(a => a.atoms.forEach(e => this.tempclauses.push(e)));


      this.MAX_N = Math.floor(Math.sqrt(this.ATOUMS_COUNT)) < 10 ? Math.floor(Math.sqrt(this.ATOUMS_COUNT)) : 10;
      this.MAX_M = Math.ceil(this.ATOUMS_COUNT / this.MAX_N);
      console.log(this.ATOUMS_COUNT, this.MAX_N, this.MAX_M);
      /*ston in clauses !!*/
      this.prepareForm();
    });

  }


  informGame(i, j) {

    this.form[i][j].informCaluse(this.color);
    if (this.propagate) {
      this.clauses.forEach(e => e.checkID(this.form[i][j].getId()));
    }
  }

  private prepareForm() {
    let x = 0;
    for (let i = 0; i < this.MAX_M; i++) {
      this.form[i] = [];
      // for (let j = i % 2 === 0 ? 0 : 10; j >= 0 && j < 10; i % 2 === 0 ? j++ : j--) {
      for (let j = 0; j < this.MAX_N; j++) {

        this.form[i][j] = this.tempclauses[x];
        x++;
      }
    }
  }


}
