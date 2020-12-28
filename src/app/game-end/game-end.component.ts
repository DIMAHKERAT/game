import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ScoreService} from '../game/services/score.service';
import {LevelScore} from '../game/models/levelScore';



@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.css']
})
export class GameEndComponent implements OnInit {
  public score = 0;
  public time = '';
  public levelId = 0;


  constructor(private scoreService: ScoreService, private  angularFireAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.score = params.score;
      this.levelId = params.id;
      const h = Math.floor(params.time / 3600);
      const m = Math.floor(params.time % 3600 / 60);
      const s = Math.floor(params.time % 3600 % 60);
      const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
      const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
      const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
      this.time = hDisplay + mDisplay + sDisplay;
      // tslint:disable-next-line:no-shadowed-variable
      const currentLevelScore =  this.scoreService.scores.scores.find( s => s.level === this.levelId) ;

      if (!currentLevelScore) {
        const score = new LevelScore(this.levelId, this.score, params.time);
        this.scoreService.scores.scores.push(score);
      } else {
        if (this.score > currentLevelScore.score){
          this.scoreService.scores.scores.find(e => e.level === this.levelId).score = this.score;
          this.scoreService.scores.scores.find(e => e.level === this.levelId).time = params.time;
        }else{
          if ( this.score === currentLevelScore.score && params.time < currentLevelScore.time){
            this.scoreService.scores.scores.find(e => e.level === this.levelId).time = params.time;
          }
        }
     }
      console.log('barad', this.scoreService.scores);
      console.log(JSON.stringify(this.scoreService.scores));
      console.log(JSON.parse(JSON.stringify(this.scoreService.scores)));
      this.angularFireAuth.user.subscribe(e => {
        console.log('this is the user ', e.uid);
        this.scoreService.saveUserScores(e.uid);
      });

    });
  }
}
