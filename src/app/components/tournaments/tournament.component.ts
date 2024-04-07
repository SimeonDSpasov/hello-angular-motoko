import { ChangeDetectorRef, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';

import { CountdownComponent, CountdownConfig  } from 'ngx-countdown';

import { lastValueFrom } from 'rxjs';

import { RequestTournamentService } from './../../services/requests/requests-tournament.service';

import { ITournament, TournamentStatus } from './../../models/tournament.model';

export interface ITournamentWithCountdown extends ITournament {
  leftTime?: number;
  format?: string;
}

interface SortedTournament {
  ongoing: ITournament[],
  upcoming: ITournament[],
  finished: ITournament[],
}

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CountdownComponent
  ],
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})

export class TournamentComponent {
  
  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private requestTournamentService: RequestTournamentService) {

    this.getTournaments();
  }

  public fetchedTournaments!: any;

  public tournamentStatus = TournamentStatus;
  public tournamentsArray!: ITournamentWithCountdown[];

  public navigateToTournament(toutnamentTitle: string): void {
    this.router.navigate([ `tournaments/${toutnamentTitle}` ]);
  }

  public sortTournaments(): SortedTournament {
    let upcoming = [];
    let ongoing = [];
    let finished = [];

    for (let i = 0; i < this.tournamentsArray.length; i++) {
      switch(this.tournamentsArray[i].status) {
        case TournamentStatus.Upcoming:
          this.handleStartTime(this.tournamentsArray[i]);
          upcoming.push(this.tournamentsArray[i]);

          break;
        case TournamentStatus.Ongoing:
          this.handleTimeLeft(this.tournamentsArray[i]);
          ongoing.push(this.tournamentsArray[i]);
          break;
        case TournamentStatus.Finished:
          finished.push(this.tournamentsArray[i]);
          break;
      }
    }

    return { upcoming, ongoing, finished };
  }


  public handleStartTime(tournament: ITournamentWithCountdown) {

    const startTime = new Date(tournament.startTime);
    const currentTime = new Date();

    if (startTime.getTime() > currentTime.getTime()) {
      console.log(tournament.title)
      console.log('here')
      const timeLeft = (startTime.getTime() - currentTime.getTime());
      tournament.leftTime = timeLeft;
    } else {
      tournament.leftTime = 0;
      tournament.format = 'mm:ss';
    }


  }

  public handleTimeLeft(tournament: ITournamentWithCountdown) {
    const endTime = new Date(tournament.endTime);
    const currentTime = new Date();

    if (endTime.getTime() > currentTime.getTime()) {
      const timeLeft = (endTime.getTime() - currentTime.getTime());
      tournament.leftTime = timeLeft;
    } else {
      tournament.leftTime = 0;
      tournament.format = 'mm:ss';
    }

  }



  private async getTournaments(): Promise<void> {
    const request = this.requestTournamentService.getAllTournaments();
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
          this.tournamentsArray = response.data;

          this.fetchedTournaments = this.sortTournaments();
        break;
      default:
        break;
    }
  }

 }
