import {GameColor} from './gameColor';

export class Atom {


  constructor(private id: number, public color: GameColor, private clause: Clause) {
  }

  public getId() {
    return this.id;
  }

  informCaluse(color: GameColor) {
    this.clause.setAtom(this.id, color);
  }

}

export class Clause {
  private score: 0;
  private atomsCount = 0;


  constructor(private id: number, public  atoms: Atom[]) {

  }

  public getScore() {
    return this.score;
  }

  public setAtom(id: number, color: GameColor) {
    this.atoms.filter(e => e.getId() === id).forEach(e => {
      if (e.color !== GameColor.WINNING && color === GameColor.WINNING) {
        this.score++;
      } else if (e.color === GameColor.WINNING && color !== GameColor.WINNING) {
        this.score--;
      }
      e.color = color;
    });
  }

  public getAtomsCount() {
    if (this.atomsCount === 0) {
      this.atoms.forEach(e => this.atomsCount++);
    }
    return this.atomsCount;
  }

  public isSatisfied() {
    //   if (this.atoms.some(atom => atom.color === GameColor.NEUTRAL)) {
    //     return false;
    //   }
    //   return this.atoms.some(atom => atom.color === GameColor.WINNING);
    return this.atoms.some(atom => atom.color === GameColor.NEUTRAL) ? false : this.atoms.some(atom => atom.color === GameColor.WINNING);
  }

  checkID(id: number) {
    this.setAtom(id, GameColor.WINNING);
  }
}
