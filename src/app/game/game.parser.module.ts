import {Atom, Clause} from './clause.model';
import {GameColor} from './gameColor';
import {Game} from './models/game';


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
    console.log('this is lines ', lines);
    lines.forEach(e => {
      e = e.trim();
      if (e !== '') {

        this.atoms = [];

        const tempClause = new Clause(0, this.atoms);

        const temp = e.trim().split(' ');
        temp.forEach(t => {
          this.atoms.push(new Atom(+t, GameColor.NEUTRAL, tempClause));
        });
        this.clauses.push(tempClause);

      }

    });
    console.log(this.clauses);
    return this.clauses;
  }

  temp = '-1 -6 -10 0\n' +
    '1 4 -6 0\n' +
    '4 -5 -6 0\n' +
    '3 4 8 0\n' +
    '-2 3 6 0\n' +
    '-4 -5 -7 0\n' +
    '-3 8 -9 0\n' +
    '-1 -2 -8 0\n' +
    '2 7 -10 0\n' +
    '2 7 -8 0\n' +
    '3 8 10 0\n' +
    '-1 4 5 0\n' +
    '1 5 10 0\n' +
    '3 7 10 0\n' +
    '-2 5 7 0\n' +
    '1 -9 -10 0\n' +
    '-3 6 -10 0\n' +
    '-3 4 -10 0\n' +
    '3 4 5 0\n' +
    '3 -4 -6 0\n' +
    '-3 -7 -8 0\n' +
    '-3 4 5 0\n' +
    '-2 -7 9 0\n' +
    '2 3 -6 0\n' +
    '-1 -4 -10 0\n' +
    '-4 5 -6 0\n' +
    '4 -7 -10 0\n' +
    '7 9 -10 0\n' +
    '2 3 -5 0\n' +
    '-1 8 9 0\n' +
    '-2 6 9 0\n' +
    '2 -3 6 0\n' +
    '1 2 -6 0\n' +
    '-4 6 -8 0\n' +
    '-1 2 8 0\n' +
    '-2 -7 10 0\n' +
    '3 -8 -10 0\n' +
    '-3 -4 -8 0\n' +
    '-6 -9 10 0\n' +
    '5 6 10 0\n' + //;
    '1 4 -6 0\n' +
    '4 -5 -6 0\n' +
    '3 4 8 0\n' +
    '-2 3 6 0\n' +
    '-4 -5 -7 0\n' +
    '-3 8 -9 0\n' +
    '-1 -2 -8 0\n' +
    '2 7 -10 0\n' +
    '2 7 -8 0\n' +
    '3 8 10 0\n' +
    '-1 4 5 0\n' +
    '1 5 10 0\n' +
    '3 7 10 0\n' +
    '-2 5 7 0\n' +
    '1 -9 -10 0\n' +
    '-3 6 -10 0\n' +
    '-3 4 -10 0\n' +
    '3 4 5 0\n' +
    '3 -4 -6 0\n' +
    '-3 -7 -8 0\n' +
    '-3 4 5 0\n' +
    '-2 -7 9 0\n' +
    '2 3 -6 0\n' +
    '-1 -4 -10 0\n' +
    '-4 5 -6 0\n' +
    '4 -7 -10 0\n' +
    '7 9 -10 0\n' +
    '2 3 -5 0\n' +
    '-1 8 9 0\n' +
    '-2 6 9 0\n' +
    '2 -3 6 0\n' +
    '1 2 -6 0\n' +
    '-4 6 -8 0\n' +
    '-1 2 8 0\n' +
    '-2 -7 10 0\n' +
    '3 -8 -10 0\n' +
    '-3 -4 -8 0\n' +
    '-6 -9 10 0\n' +
    '1 4 -6 0\n' +
    '4 -5 -6 0\n' +
    '3 4 8 0\n' +
    '-2 3 6 0\n' +
    '-4 -5 -7 0\n' +
    '-3 8 -9 0\n' +
    '-1 -2 -8 0\n' +
    '2 7 -10 0\n' +
    '2 7 -8 0\n' +
    '3 8 10 0\n' +
    '-1 4 5 0\n' +
    '1 5 10 0\n' +
    '3 7 10 0\n' +
    '-2 5 7 0\n' +
    '1 -9 -10 0\n' +
    '-3 6 -10 0\n' +
    '-3 4 -10 0\n' +
    '3 4 5 0\n' +
    '3 -4 -6 0\n' +
    '-3 -7 -8 0\n' +
    '-3 4 5 0\n' +
    '-2 -7 9 0\n' +
    '2 3 -6 0\n' +
    '-1 -4 -10 0\n' +
    '-4 5 -6 0\n' +
    '4 -7 -10 0\n' +
    '7 9 -10 0\n' +
    '2 3 -5 0\n' +
    '-1 8 9 0\n' +
    '-2 6 9 0\n' +
    '2 -3 6 0\n' +
    '1 2 -6 0\n' +
    '-4 6 -8 0\n' +
    '-1 2 8 0\n' +
    '-2 -7 10 0\n' +
    '3 -8 -10 0\n' +
    '-3 -4 -8 0\n' +
    '-6 -9 10 -9 10 0\n';
}

