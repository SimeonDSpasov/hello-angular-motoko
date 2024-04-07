import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { lastValueFrom } from "rxjs";

import { IpiDialogComponent } from '@ipi-soft/ng-components/dialog';
import { IpiTableComponent } from '@ipi-soft/ng-components/table';

import { IpiInputComponent } from './../../custom/input/src/lib';

import { RequestsUserService } from "./../../../services/requests/requests-user.service";

import { NumbersOnlyDirective } from "./../../../directives/numbers-only-directive";

import { User } from "./../../../models/user.model";

@Component({
  selector: 'app-admin-single-user',
  standalone: true,
  imports: [
    IpiTableComponent,
    IpiInputComponent,
    IpiDialogComponent,
    NumbersOnlyDirective,
  ],
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})

export class SingleUserComponent {

  constructor(private requestUserService: RequestsUserService) { 
    this.getUserAsAdmin('');
  }

  public user!: User;

  private async getUserAsAdmin(id: string) {
    const request = this.requestUserService.getUserAsAdmin<User>(id);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.user = response.data;
        break;
      default:
        // TO DO: handle error
        break;
    }

  }


}