import {Component, OnInit} from '@angular/core';

import {Atom, Clause} from './models/clause.model';
import {GameParser} from './models/game.parser';
import {GameIcons} from './enums/gameIcons';
// import {GameColor} from './enums/gameColor';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from './services/game.service';
import {Timer} from './models/timer.model';
import {GameColorService} from './services/game-color.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public  score = 0;
  private clauses: Clause[] = [];
  public form: Atom[][] = [];
  public icons;
  public tempclauses: Atom[] = [];
  public MAX_COLUMN = 0;
  public MAX_ROWS = 0;
  private ATOUMS_COUNT: number;
  public propagate: boolean;
  public color: string;
  public timer: Timer;
  public id: number;

  constructor(private gameService: GameService, public gameColor: GameColorService, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {
    this.timer = new Timer(0, 0, 0);
    this.timer.startTimer();
    this.route.params.subscribe(params => {
      this. id = params.id;
      const gameParser = new GameParser(this.gameColor, this.gameService.getGame(this.id));
      this.propagate = false;
      this.color = null;
      this.clauses = [];
      this.tempclauses = [];
      this.clauses = gameParser.getClauses();
      this.ATOUMS_COUNT = 0;
      this.clauses.forEach(e => this.ATOUMS_COUNT += +e.getAtomsCount());
      this.icons = GameIcons;

      this.MAX_COLUMN = Math.floor(Math.sqrt(this.ATOUMS_COUNT)) < 10 ? Math.floor(Math.sqrt(this.ATOUMS_COUNT)) : 10;
      this.MAX_ROWS = Math.ceil(this.ATOUMS_COUNT / this.MAX_COLUMN);
      console.log(this.tempclauses);
      console.log(this.ATOUMS_COUNT, this.MAX_COLUMN, this.MAX_ROWS);

      /*ston in clauses !!*/
      if (this.MAX_COLUMN * this.MAX_ROWS > this.ATOUMS_COUNT){
        const puller = this.MAX_COLUMN * this.MAX_ROWS - this.ATOUMS_COUNT;
        let i: number;
        const atoms: Atom[] = [];
        const tempClause = new Clause(this.gameColor, 0, atoms);
        for (i = 0; i < puller; i++){
          atoms.push(new Atom(0, this.gameColor.neutColor, this.gameColor.neutBColor, tempClause));
        }
        this.clauses.push(tempClause);
      }

      this.clauses.forEach(a => a.atoms.forEach(e => this.tempclauses.push(e)));
      this.prepareForm();
    });

  }


  informGame(i, j) {


    if (this.color !== null){
      let rebackcoler = true;
      if (this.propagate) {
        this.clauses.forEach(e => e.setAtomColor(this.form[i][j].getId(), this.color));
      }else{
        this.form[i][j].setColor(this.color);
      }
      for (const clause of this.clauses){
         if (!clause.isOk(this.form[i][j].getId(), this.color)){
           this.clauses.forEach(e => e.setAtomBackcolor(this.form[i][j].getId(), this.gameColor.conColor));
           this.clauses.forEach(e => e.setAtomBackcolor(-this.form[i][j].getId(), this.gameColor.conColor));
           rebackcoler = false;
           break;
         }
      }
      if (rebackcoler){
        this.clauses.forEach(e => e.setAtomBackcolor(this.form[i][j].getId(), this.gameColor.neutBColor));
        this.clauses.forEach(e => e.setAtomBackcolor(-this.form[i][j].getId(), this.gameColor.neutBColor));
      }
      this.score = 0;
      this.clauses.forEach(e => this.score += +e.getScore());
      this.checkSatisfied();
      this.clauses.forEach(e => e.setBackcolor());
    }
  }
  public checkSatisfied() {
    for (const clause of this.clauses) {
      if (!clause.isSatisfied()){
        return;
      }
    }
    this.router.navigate(['/game-end', this.id, this.score,  this.timer.total]);
  }
  setPropagate(e) {
    this.propagate = e.checked;
  }
  private prepareForm() {
    this.createZigZag(this.MAX_ROWS, this.MAX_COLUMN);

  }

  private createZigZag(row, col) {
    let evenRow = 0; // starts from the first row
    let oddRow = 1; // starts from the next row
    let x = 0;
    while (evenRow < row) {
      this.form[evenRow] = [];
      for (let i = 0; i < col; i++) {
        this.form[evenRow][i] = this.tempclauses[x];
        x++;
      }
      // Skipping next row so as to get the next evenRow
      evenRow = evenRow + 2;

      if (oddRow < row) {
        this.form[oddRow] = [];
        for (let i = col - 1; i >= 0; i--) {
          this.form[oddRow][i] = this.tempclauses[x];
          x++;
        }
      }
      // Skipping next row so as to get the next oddRow
      oddRow = oddRow + 2;
    }
  }




  setColor(e: string) {
    if (e === 'w') {
      this.color = this.gameColor.winColor;
    } else {
      this.color = this.gameColor.losColor;
    }
  }

  getClass(i: number, j: number) {
    let s = '';
    if (i > 0) {
      if (this.form[i][j].getClause() !== this.form[i - 1][j].getClause()) {
        s += ' border-top';
      }
    } else {
      s += ' border-top2';
    }
    if (i < this.MAX_ROWS - 1) {
      if (this.form[i][j].getClause() !== this.form[i + 1][j].getClause()) {
        s += ' border-bottom';
      }
    } else {
      s += ' border-bottom2';
    }
    if (j > 0) {
      if (this.form[i][j].getClause() !== this.form[i][j - 1].getClause()) {
        s += ' border-left';
      }
    } else {
      s += ' border-left2';
    }
    if (j < this.MAX_COLUMN - 1) {
      if (this.form[i][j].getClause() !== this.form[i][j + 1].getClause()) {
        s += ' border-right';
      }
    } else {
      s += ' border-right2';
    }
    return s;
  }
}
