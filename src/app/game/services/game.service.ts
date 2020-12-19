import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Game} from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  collectionName = 'games';
  games: Game[] = [];

  constructor(private firestore1: AngularFirestore) {
  }

  async getGames(): Promise<Game[]> {
    const games = await this.firestore1.collection(this.collectionName).ref.get();
    this.games = games.docs.map(g => {
      // @ts-ignore
      return new Game(g.data().level, g.data().name, g.data().data);
    });
    return this.games;
  }

  public getGame(level: number) {
    return this.games.find(g => g.level === level);
  }


}
