import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { XSSService } from './../xss.service';
import { HttpService, CustomResponse } from './../http.service';

import { env } from './../../../../src/app/environments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class RequestsBybitService {

  constructor(
    private xSSService: XSSService,
    private httpService: HttpService) { }

  // B -> body
  // R -> response

  public validateKeys<B, R>(body: B): Observable<CustomResponse<R>> {
    const cleanBody = this.xSSService.clean(body);
    const url = env.apiUrl + env.endpoints.bybit.validate;

    return this.httpService.post<B, R>(url, cleanBody);
  }


}
