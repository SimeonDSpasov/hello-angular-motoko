import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { XSSService } from './../xss.service';
import { HttpService, CustomResponse } from './../http.service';

import { env } from './../../../../src/app/environments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class RequestsUserService {

  constructor(
    private xSSService: XSSService,
    private httpService: HttpService) { }

  // B -> body
  // R -> response

  public getUser<R>(all?: boolean): Observable<CustomResponse<R>> {
    let url = env.apiUrl + env.endpoints.user.getUpdate;

    if (all) {
      url += '?all=true';
    }

    return this.httpService.get<R>(url);
  }

  public getUserAsAdmin<R>(id: string): Observable<CustomResponse<R>> {
    const url = env.apiUrl + env.endpoints.user.getUpdate + '?id=' + id;

    return this.httpService.get<R>(url);
  }

  public updateUserAsAdmin<B, R>(id: string, body: B): Observable<CustomResponse<R>> {
    const cleanBody = this.xSSService.clean(body);
    const url = env.apiUrl + env.endpoints.user.updateUser.replace(':id', id);

    return this.httpService.post<B, R>(url, cleanBody);
  }

  public clearBybitKeys<B, R>(body: B): Observable<CustomResponse<R>> {
    const cleanBody = this.xSSService.clean(body);
    const url = env.apiUrl + env.endpoints.user.clearKeys;

    return this.httpService.post<B, R>(url, cleanBody);
  }

  public changeUserPassword<B, R>(body: B): Observable<CustomResponse<R>> {
    const cleanBody = this.xSSService.clean(body);
    const url = env.apiUrl + env.endpoints.user.changePassword;

    return this.httpService.post<B, R>(url, cleanBody);
  }

}
