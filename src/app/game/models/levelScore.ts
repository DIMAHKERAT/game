export class LevelScore {
  constructor(public level: number,
              public score: number,
              public time: number) {
  }
}
export class Score {
  constructor(public scores: LevelScore[]) {
  }
}
