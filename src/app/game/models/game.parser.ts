import {Atom, Clause} from './clause.model';
import {GameColor} from '../enums/gameColor';
import {Game} from './game';


export class GameParser {


  clauses: Clause[];
  atoms: Atom[];
  game: Game;

  constructor(game: Game) {
    this.clauses = [];
    this.atoms = [];
    this.game = game;
  }

  public getClauses() {
    const lines = this.game.data.split('0');
    lines.forEach(e => {
      e = e.trim();
      if (e !== '') {

        this.atoms = [];

        const tempClause = new Clause(0, this.atoms);

        const temp = e.trim().split(' ');
        temp.forEach(t => {
          this.atoms.push(new Atom(+t, GameColor.NEUTRAL, GameColor.NNN, tempClause));
        });
        this.clauses.push(tempClause);
      }
    });

    return this.clauses;
  }

}

