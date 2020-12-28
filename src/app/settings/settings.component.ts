import { Component, OnInit } from '@angular/core';
import {GameColorService} from '../game/services/game-color.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public tempwinColor = '#ff0000';
  public templosColor = '#002789';
  public tempsatColor = '#03f300';
  public tempusatColor = '#490000';
  public tempconColor = '#808080';
  errorMessage = false;


  constructor(private router: Router, private gameColor: GameColorService) { }

  ngOnInit(): void {
    this.tempwinColor  = this.gameColor.winColor;
    this.templosColor = this.gameColor.losColor;
    this.tempsatColor = this.gameColor.satColor;
    this.tempusatColor = this.gameColor.usatColor;
    this.tempconColor = this.gameColor.conColor;
  }


  save() {
    if (this.tempwinColor === this.templosColor ||
      this.tempsatColor === this.tempusatColor ||
      this.tempsatColor === this.tempconColor ||
      this.tempusatColor === this.tempconColor){
      this.errorMessage = true;
    }else{
      this.errorMessage = false;
      this.gameColor.winColor = this.tempwinColor;
      this.gameColor.losColor = this.templosColor;
      this.gameColor.satColor = this.tempsatColor;
      this.gameColor.usatColor = this.tempusatColor;
      this.gameColor.conColor = this.tempconColor;
      this.router.navigate(['/main']);
    }
  }
}
