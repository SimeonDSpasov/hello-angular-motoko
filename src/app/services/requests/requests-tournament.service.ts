import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { HttpService, CustomResponse } from "./../http.service";

import { IParticipant, ITournament, TournamentStatus, AddUserToTournamentBody, removeUserFromTournamentBody } from './../../models/tournament.model';

import { env } from "./../../..//app/environments/enviroment";

@Injectable({
    providedIn: 'root'
})

export class RequestTournamentService {

    constructor(private httpService: HttpService) {}

    public getAllTournaments<R>(): Observable<CustomResponse<ITournament[]>> {
      let url = env.apiUrl + env.endpoints.tournaments.getAllTournaments;

      return this.httpService.get<ITournament[]>(url);
    }

    public getTournamentByTitle<R>(title: string): Observable<CustomResponse<ITournament>> {
      let url = env.apiUrl + env.endpoints.tournaments.getTournamentByTitle.replace(':title', title);

      return this.httpService.get<ITournament>(url);
    }

    public addUserToTournament<R>(body: AddUserToTournamentBody): Observable<CustomResponse<R>> {
      let url = env.apiUrl + env.endpoints.tournaments.addUserToTournament;
    
      return this.httpService.post<AddUserToTournamentBody, R>(url, body);
    }

    public removeUserFromTournament<R>(body: removeUserFromTournamentBody): Observable<CustomResponse<R>> {
      let url = env.apiUrl + env.endpoints.tournaments.removeUserFromTournament;

      return this.httpService.post<removeUserFromTournamentBody, R>(url, body);
    }
}