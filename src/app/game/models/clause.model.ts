import {GameColor} from '../enums/gameColor';

export class Atom {


  constructor(private id: number, public color: GameColor, public backcolor: GameColor, private clause: Clause) {
  }

  public getId() {
    return this.id;
  }
  public getClause(){
    return this.clause;
  }
  setColor(color: GameColor) {
    this.clause.setAtomColor(this.id, color);
  }

  setBackolor(color: GameColor) {
    this.clause.setAtomBackcolor(this.id, color);
  }



}

export class Clause {
  private score =  0;
  private atomsCount = 0;


  constructor(private id: number, public  atoms: Atom[]) {

  }

  public getScore() {
    return this.score;
  }
  public getid(){
    return this.id;
  }

  public setAtomColor(id: number, color: GameColor) {
    this.atoms.filter(e => e.getId() === id).forEach(e => {
      if (e.color !== GameColor.WINNING && color === GameColor.WINNING) {
        this.score++;
      } else if (e.color === GameColor.WINNING && color !== GameColor.WINNING) {
        this.score--;
      }
      e.color = color;
    });
  }

  public setAtomBackcolor(id: number, color: GameColor) {
    this.atoms.filter(e => e.getId() === id).forEach(e => {
      e.backcolor = color;
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
    return this.atoms.some(atom => atom.color === GameColor.NEUTRAL || atom.backcolor === GameColor.ERRORR) ?
      false : this.atoms.some(atom => atom.color === GameColor.WINNING);
  }

  // checkID(id: number, color: GameColor ) {
  //   this.setAtomColor(id, color);
  // }

  isOk(id: number, color: GameColor) {
    if ( !this.atoms.some(e => e.getId() === id ||   e.getId() === -id)){
      // console.log('dose not contains ');
      return true;
    }else{

      return this.atoms.some(e => ((e.getId() === id ||   e.getId() === -id) && e.color === GameColor.NEUTRAL )
        || ((e.getId() === id && e.color === color ||   e.getId() === -id && e.color !== color) ));
    }

  }
}
