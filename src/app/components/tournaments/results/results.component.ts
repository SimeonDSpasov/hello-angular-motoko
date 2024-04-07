import { NgFor, NgClass, } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface IParticipantPopulated {
  result: number;
  initialEquity: number;
  adjustedEquity: number;
  userId: {
    username: string;
  }
}

@Component({
  selector: 'app-results-component',
  standalone: true,
  imports: [
    NgFor,
    NgClass
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})

export class ResultsComponent {

  @Input() results: any[] = [];

  constructor() {

  }

}
