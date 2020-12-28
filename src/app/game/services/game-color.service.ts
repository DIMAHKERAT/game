import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameColorService {
  public neutColor = '#000000';
  public neutBColor = '#ffffff';
  public winColor = '#ff0000';
  public losColor = '#002789';
  public satColor = '#03f300';
  public usatColor = '#490000';
  public conColor = '#808080';
  constructor() { }
}
