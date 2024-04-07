import { ChangeDetectorRef, Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { lastValueFrom } from "rxjs";

import { IpiDialogComponent } from '@ipi-soft/ng-components/dialog';
import { IpiTableColumn, IpiTableColumnType, IpiTableComponent } from '@ipi-soft/ng-components/table';

import { IpiInputComponent, IpiInputOptions, IpiControlErrors } from './../../custom/input/src/lib/';

import { RequestsUserService } from "./../../../services/requests/requests-user.service";

import { NumbersOnlyDirective } from "./../../../directives/numbers-only-directive";

import { User } from "./../../../models/user.model";

interface FormControls {
  email: [string, ((control: AbstractControl) => ValidationErrors | null)[]];
  username: [string, ((control: AbstractControl) => ValidationErrors | null)[]];
  api_public: [string, ((control: AbstractControl) => ValidationErrors | null)[]];
  api_secret: [string, ((control: AbstractControl) => ValidationErrors | null)[]];
  winrate: [number, ((control: AbstractControl) => ValidationErrors | null)[]];
  wins: [number, ((control: AbstractControl) => ValidationErrors | null)[]];
  elo: [number, ((control: AbstractControl) => ValidationErrors | null)[]];
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    IpiTableComponent,
    IpiInputComponent,
    IpiDialogComponent,
    NumbersOnlyDirective,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private requestsUserService: RequestsUserService,
  ) {
    this.getUsers();
  }

  public users!: User[];

  public userForEdit: User | null = null;

  public shouldRenderEditUser = false;
  public shouldRenderUserSuspend = false;

  public emailOptions!: IpiInputOptions;
  public usernameOptions!: IpiInputOptions;
  public apiPublicOptions!: IpiInputOptions;
  public apiSecretOptions!: IpiInputOptions;
  public winsOptions!: IpiInputOptions;
  public winrateOptions!: IpiInputOptions;
  public eloOptions!: IpiInputOptions;

  public usersTableColumns: IpiTableColumn[] = [
    { label: 'Created', value: 'createdAt', type: IpiTableColumnType.Date },
    { label: 'Email', value: 'email', width: '200px' },
    { label: 'Username', value: 'username', width: '100px' },
    { label: 'API Public', value: 'api_public', width: '100px'},
    { label: 'API Secret', value: 'api_secret', width: '300px' },
    { label: 'Wins', value: 'wins', width: '60px'},
    { label: 'Elo', value: 'elo', width: '60px'},
    { label: '', value: 'suspended', type: IpiTableColumnType.Actions,
      singleActions: [
        {
          label: 'More Info',
          icon: 'users/eye.svg',
          execute: (row: User) => {
            this.router.navigate([ `users/${row.id}` ]);
          },
        },
      ],
      multipleActions: [
        {
          label: 'Edit User',
          icon: 'users/user.svg',
          execute: (row: User) => {
            this.userForEdit = row;
            this.shouldRenderEditUser = true;

            this.createForm(row);
          },
        },
        {
          label: 'Suspend',
          showOn: [false],
          icon: 'users/circle-x-small.svg',
          execute: (row: User) => {
            this.userForEdit = row;
            this.shouldRenderUserSuspend = true;
          },
        },
        {
          label: 'Unsuspend',
          showOn: [true],
          icon: 'users/circle-x-small.svg',
          execute: (row: User) => {
            this.userForEdit = row;
            this.shouldRenderUserSuspend = true;
          },
        },
      ]
    }
  ]

  private formGroup!: FormGroup;

  private async getUsers(): Promise<number> {
    const request = this.requestsUserService.getUser<User[]>(true);
    const response = await lastValueFrom(request);

    switch(response.status) {
      case 200:
         this.users = response.data;
        break;
      case 403:
        this.router.navigate(['suspended']);
    }

    return response.status;
  }

  public async edit(): Promise<void> {
    if (!this.formGroup.valid || !this.userForEdit) {
      return;
    }

    const body = {
      email: this.formGroup.value['email'].toLowerCase().trim(),
      username: this.formGroup.value['username'],
      api_public: this.formGroup.value['api_bluc'],
      api_secret: this.formGroup.value['api_secret'],
      elo: this.formGroup.value['elo'],
      winrate: this.formGroup.value['winrate'],
      wins: this.formGroup.value['wins'],
      tournamentsId: this.userForEdit.tournamentsId,
    };

    const request = this.requestsUserService.updateUserAsAdmin<Partial<User>, User>(this.userForEdit.id, body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.shouldRenderEditUser = false;
        await this.getUsers();
        break;
      case 400:
        // Email already exists
        this.formGroup.controls['email'].setErrors({ invalid: true });
    }

  }

  private createForm(user: User) {
    const formControls: FormControls = {
      email: [user.email, [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_\.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/) ]],
      username: [user.username, [ Validators.required ]],
      api_public: [user.api_public, [ Validators.minLength(18), Validators.maxLength(18) ]],
      api_secret: [user.api_secret, [ Validators.minLength(36), Validators.maxLength(36) ]],
      winrate: [user.winrate, [Validators.required, Validators.min(0), Validators.max(100)]],
      wins: [user.wins, [ Validators.required, Validators.min(0)]],
      elo: [user.elo, [Validators.required, Validators.min(0), Validators.max(9999)]],
    };

    this.formGroup = this.formBuilder.group(formControls);

    this.emailOptions = {
      label: 'Email',
      formGroup: this.formGroup,
      formControlName: 'email',
      errors: {
        required: 'Email is required',
        pattern: 'Invalid format',
        invalid: 'Email already in use',
      },
    };

    this.usernameOptions = {
      label: 'Username',
      formGroup: this.formGroup,
      formControlName: 'username',
      errors: {
        required: 'Username is required',
      },
    };

    this.apiPublicOptions = {
      label: 'API Public key',
      formGroup: this.formGroup,
      formControlName: 'api_public',
      errors: {
        minlength: 'length must be 18',
        maxlength: 'length must be 18',
      },
    };

    this.apiSecretOptions = {
      label: 'API Secret key',
      formGroup: this.formGroup,
      formControlName: 'api_secret',
      errors: {
        minlength: 'length must be 36',
        maxlength: 'length must be 36',
      },
    };

    this.winrateOptions = {
      label: 'Win rate %',
      formGroup: this.formGroup,
      formControlName: 'winrate',
      errors: {
        required: 'Winrate is required',
        min: 'Win rate must be from 0% to 100%',
        max: 'Win rate must be from 0% to 100%',
      },
    };

    this.winsOptions = {
      label: 'Wins',
      formGroup: this.formGroup,
      formControlName: 'wins',
      errors: {
        required: 'Wins are required',
        min: 'Wins must be positive number'
      },
    };

    this.eloOptions = {
      label: 'Elo',
      formGroup: this.formGroup,
      formControlName: 'elo',
      errors: {
        required: 'Elo is required',
        max: 'Elo must be under 9999',
        min: 'Elo must be positive number'
      },
    }
  }
}