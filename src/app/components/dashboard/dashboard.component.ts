import { Component, ElementRef, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { lastValueFrom } from 'rxjs';

import { SvgIconComponent } from 'angular-svg-icon';

import { RequestsBybitService } from './../../services/requests/requests-bybit.service';

import { UserService } from './../../../../src/app/services/user-service';
import { RequestsUserService } from './../../services/requests/requests-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SvgIconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  @ViewChild('connectCloseButton') connectCloseButton!: ElementRef;
  @ViewChild('disconnectCloseButton') disconnectCloseButton!: ElementRef;

  constructor (
    public router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private requestsUserService: RequestsUserService,
    private requestsBybitService: RequestsBybitService) {
      this.bybitRequestForm = this.formBuilder.group({
        publickey: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
        privatekey: ['', [ Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
      });

      this.changePasswordForm = this.formBuilder.group({
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
      });
  }

  public user = this.userService.user()!;

  public isLoading = false;
  public bybitModal = false;
  public bybitRequestForm: FormGroup;
  public changePasswordForm: FormGroup;

  public showAlert: boolean = false;
  public alertMessage: string = '';
  public alertType: string = '';

  public publickeyHasErrors(): ValidationErrors | null {
    return this.bybitRequestForm.controls['publickey'].errors;
  }

  public privatekeyHasErrors(): ValidationErrors | null {
    return this.bybitRequestForm.controls['privatekey'].errors;
  }

  public showAPIModal(): void {
    this.bybitModal = true;
  }

  public async validateAndUpdateApiKeys(): Promise<void> {
    this.isLoading = true;

    const body = {
      api_public: this.bybitRequestForm.controls['publickey'].value,
      api_secret: this.bybitRequestForm.controls['privatekey'].value
    }

    const request = this.requestsBybitService.validateKeys(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.toggleAlert('API Keys connected successfuly', 'success');

        if (response.data) {
          this.user.api_public = response.data.toString();
        }
  
        this.changeDetectorRef.detectChanges();
        break;
      default:
        if (response.error) {
          this.toggleAlert(response.error, 'error');
        }
    }
    this.isLoading = false;
    this.connectCloseButton.nativeElement.click();
  }

  public async clearBybitKeys(): Promise<void> {
    this.isLoading = true;

    const body = {};
  
    const request = this.requestsUserService.clearBybitKeys(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.user.api_public = '';
        this.toggleAlert('API Keys cleared successfully', 'success');

        break;
      default:
        this.toggleAlert('En error has occured', 'error');
    }

    this.isLoading = false;
    this.disconnectCloseButton.nativeElement.click();
  }

  public async changeUserPassword(): Promise<void> {
    const body = {};
  }

  public toggleAlert(message: string, alertType: 'error' | 'success'): void {
    this.alertMessage = message;
    this.alertType = alertType;

    this.showAlert = true;

    setTimeout(() => { this.showAlert = false; }, 6000);
  }

}
