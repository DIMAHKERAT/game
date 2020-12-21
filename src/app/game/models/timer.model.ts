export class Timer {
  constructor(private hours: number,
              private minutes: number,
              private seconds: number) {

  }

  private interval;
  public total = 0;
  public time = 'Hours: 0, Minutes: 0, Seconds: 0';

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
      this.time = `Hours: ${this.hours} , Minutes: ${this.minutes}, Seconds: ${this.seconds}`;
    }, 1000);
  }


}
