// import {GameColor} from '../enums/gameColor';

import {GameColorService} from '../services/game-color.service';

export class Atom {


  constructor(private id: number, public color: string, public backcolor: string, private clause: Clause) {
  }

  public getId() {
    return this.id;
  }
  public getClause(){
    return this.clause;
  }
  setColor(color: string) {
    this.clause.setAtomColor(this.id, color);
  }

  setBackolor(color: string) {
    this.clause.setAtomBackcolor(this.id, color);
  }



}

export class Clause {
  private score =  0;
  private atomsCount = 0;


  constructor(private gameColor: GameColorService, private id: number, public  atoms: Atom[]) {

  }

  public getScore() {
    return this.score;
  }
  public getid(){
    return this.id;
  }

  public setAtomColor(id: number, color: string) {
    this.atoms.filter(e => e.getId() === id).forEach(e => {
      if (e.color !== this.gameColor.winColor && color === this.gameColor.winColor) {
        this.score++;
      } else if (e.color === this.gameColor.winColor && color !== this.gameColor.winColor) {
        this.score--;
      }
      e.color = color;
    });
  }
  public setBackcolor() {
    if (!this.atoms.some(atom => atom.color === this.gameColor.neutColor) ){
      if (this.atoms.some(atom => atom.color === this.gameColor.winColor)){
        this.atoms.forEach(e => {
          if (e.backcolor !== this.gameColor.condColor){
            e.backcolor = this.gameColor.satColor;
          }
        });
      }else{
        this.atoms.forEach(e => {
          if (e.backcolor !== this.gameColor.condColor){
            e.backcolor = this.gameColor.usatColor;
          }
        });
      }
    }
  }
  public setAtomBackcolor(id: number, color: string) {
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
    return this.atoms.some(atom => atom.color === this.gameColor.neutColor || atom.backcolor === this.gameColor.condColor) ?
      false : this.atoms.some(atom => atom.color === this.gameColor.winColor);
  }


  isOk(id: number, color: string) {
    if ( !this.atoms.some(e => e.getId() === id || e.getId() === -id)){
      return true;
    }else{
      return this.atoms.some(e => ((e.getId() === id ||   e.getId() === -id) && e.color === this.gameColor.neutColor)
        || ((e.getId() === id && e.color === color ||   e.getId() === -id && e.color !== color) ));
    }

  }


}
