import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Game} from '../models/game';
import {AngularFireAuth} from '@angular/fire/auth';
import {LevelScore, Score} from '../models/levelScore';


@Injectable({
  providedIn: 'root'
})
export class ScoreService {


  collectionName = 'scores';
  public scores: Score = null;

  constructor(private  angularFireAuth: AngularFireAuth, private firestore1: AngularFirestore) {
  }

  async getUserScores(id: string): Promise<Score> {
    const scores = await this.firestore1.collection(this.collectionName).ref.doc(id).get();
    // @ts-ignore
    this.scores = scores.data();
    if (!this.scores) {
      this.scores = {
        scores: []
      };
    }
    return this.scores;
  }

  async saveUserScores(id: string) {
    const scores = {scores: []}; // copy object
    scores.scores = this.scores.scores.map((obj) => {
      return Object.assign({}, obj);
    });
    console.log(scores);
    await this.firestore1.collection(this.collectionName).ref.doc(id).set(scores);
  }


}
