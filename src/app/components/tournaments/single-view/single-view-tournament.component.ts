import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CountdownComponent  } from 'ngx-countdown';

import { lastValueFrom } from 'rxjs';

import { ResultsComponent } from './../results/results.component';

import { RequestTournamentService } from './../../../services/requests/requests-tournament.service';

import { ITournamentWithCountdown } from './../tournament.component';
import { AddUserToTournamentBody, ITournament, TournamentStatus, removeUserFromTournamentBody } from './../../../models/tournament.model';
import { UserService } from './../../../services/user-service';

@Component({
  selector: 'app-single-view-tournament',
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    ResultsComponent,
    CountdownComponent,
  ],
  templateUrl: './single-view-tournament.component.html',
  styleUrls: ['./single-view-tournament.component.css']
})

export class SingleViewTournamentComponent {

  @ViewChild('addUserCloseButton' ) addUserCloseButton!: ElementRef;
  @ViewChild('removeUserCloseButton') removeUserClosedButton!: ElementRef;

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private requestTournamentService: RequestTournamentService,) 
    {
    this.title = this.route.snapshot.params['title'];

    this.init();
    }  

  public title: string;
  public tournament!: ITournamentWithCountdown; 

  public tournamentStatus = TournamentStatus;

  public alertMessage!: string;
  public alertType!: string;

  public showAlert = false;
  public userJoined = false;

  public async init(): Promise<void> {
    if (!this.title) {
      return;
    }

    const body = {
      title: this.title,
    }

    const request = this.requestTournamentService.getTournamentByTitle(this.title);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.tournament = response.data;
        this.isUserJoined();
        switch (response.data.status) {
          case this.tournamentStatus.Upcoming:
            this.handleStartTime(this.tournament);
            break;
          case this.tournamentStatus.Ongoing:
            this.handleTimeLeft(this.tournament);
            break;
          default:
            break;
        }

        break;
      default:

    }
  }

  public async addUserToTournament(): Promise<void> {
    if (!this.tournament.title) {
      return;
    }

    const body: AddUserToTournamentBody = {
      tournamentTitle: this.tournament.title
    }

    const request = this.requestTournamentService.addUserToTournament<any>(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.init();
        break;
      default:
        if (response.error) {
          this.toggleAlert(response.error, 'error');
        }
    }

    this.addUserCloseButton.nativeElement.click();
  }

  public async removeUserFromTournament(): Promise<void> {
    if (!this.tournament.title) {
      return;
    }

    const body: removeUserFromTournamentBody = {
      tournamentTitle: this.tournament.title
    }

    const request = this.requestTournamentService.removeUserFromTournament<any>(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.init();
        break;
      default:
        if (response.error) {
          this.toggleAlert(response.error, 'error');
        }
    }

    this.removeUserClosedButton.nativeElement.click();
  }

  public handleStartTime(tournament: ITournamentWithCountdown) {
    const startTime = new Date(tournament.startTime);
    const currentTime = new Date();

    if (startTime.getTime() > currentTime.getTime()) {
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

  public toggleAlert(message: string, alertType: 'error' | 'success'): void {
    this.alertMessage = message;
    this.alertType = alertType;

    this.showAlert = true;

    setTimeout(() => { this.showAlert = false; }, 6000);
  }

  public isUserJoined(): void {
    let user = this.userService.user();

    if (!this.tournament.participants || !user) {
      this.userJoined = false;
      return;
    }

    var participants = this.tournament.participants as any;

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].userId.username === user?.username) {
        this.userJoined = true;
        return;
      }
    }

    this.userJoined = false; 
  }
}
