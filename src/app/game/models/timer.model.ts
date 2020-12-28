export class Timer {
  constructor(private hours: number,
              private minutes: number,
              private seconds: number) {

  }

  private interval;
  public total = 0;
  public time = '0:0:0';

  startTimer() {
    this.interval = setInterval(() => {
      this.total++;
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      this.time = `${this.hours}:${this.minutes}:${this.seconds}`;
    }, 1000);
  }


}
