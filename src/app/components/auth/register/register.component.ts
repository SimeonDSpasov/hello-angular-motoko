import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import  { ActivatedRoute, Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { RequestsAuthService } from './../../../services/requests/requests-auth.service';
import { PasswordValidatorService } from './../../../services/password-validator.service';

interface RegisterBody {
  email: string;
  username: string;
  password: string;
}

interface LoginBody {
  username: string,
  password: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @Input({ required: true }) loginClicked!: boolean;
  @Input({ required: true }) registerClicked!: boolean;

  @Output() closeChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestsAuthService: RequestsAuthService,
    private passwordValidatorService: PasswordValidatorService) {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_\.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/) ]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidatorService.passwordValidator]],
        repeatPassword: ['', [ Validators.required ]]
      });


      this.passwordValidatorService.repetPasswordValidator(this.registerForm);

      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });


      this.registerForm.valueChanges.subscribe(() => {
        this.statusMessage = '';
      })

      this.loginForm.valueChanges.subscribe(() => {
        this.statusMessage = '';
      })
    }

  public registerState: boolean = true;
  public isLoading = false;

  public registerForm: FormGroup;
  public loginForm: FormGroup;

  public statusMessage = '';

  public changeClickState(registerClicked = false) {
    this.closeChange.emit(registerClicked);
  }

  public changeModalState(): void {
    this.statusMessage = '';
    this.stateChange.emit();
  }

  public navigateToCurrentPage(): void {
    const currentUrl = this.router.url; // Get the current URL
    const queryParams = this.route.snapshot.queryParams; // Get the current query parameters

    // Navigate to the same URL with the same query parameters
    this.router.navigate([currentUrl], { queryParams: queryParams });
  }

  public async register() {
    this.isLoading = true;

    if (!this.registerForm.valid) {
      if (this.registerForm.controls['username'].hasError('required')) {
        this.statusMessage += ' Username is required.\n';
      }

      if (this.registerForm.controls['email'].hasError('required')) {
        this.statusMessage += ' Email is required.\n';
      }

      if (this.registerForm.controls['email'].hasError('pattern')) {
        this.statusMessage += ' Invalid email format.\n';
      }

      if (this.registerForm.controls['password'].hasError('required')) {
        this.statusMessage += ' Password is required';
      }

      if (this.registerForm.controls['password'].hasError('minlength')) {
        this.statusMessage += ' Password must be atleast 8 characters long.';
      }

      if (this.registerForm.controls['repeatPassword'].hasError('passwordsIdentical')) {
        this.statusMessage += ' Repeat password must match.';
      }

      return;
    }

    const body: RegisterBody = {
      username: this.registerForm.controls['username'].value.trim(),
      email: this.registerForm.controls['email'].value.trim(),
      password: this.registerForm.controls['password'].value.trim()
    }

    const request = this.requestsAuthService.register<RegisterBody, void>(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.isLoading = false;
        this.changeClickState(this.registerClicked);
        this.router.navigate([ '/dashboard' ]);
        break;
      case 400:
        if (response.error) {
          this.statusMessage = response.error;
        }

        this.isLoading = false;
        break;
      default:
        this.isLoading = false;

        break;
    }
  }

  public async login() {
    this.isLoading = true;

    if (!this.loginForm.valid) {
      this.statusMessage = 'Wrong username/password format.';
      this.isLoading = false;
      return;
    }

    const body: LoginBody = {
      username: this.loginForm.controls['username'].value.trim(),
      password: this.loginForm.controls['password'].value.trim()
    }

    const request = this.requestsAuthService.login<LoginBody, void>(body);
    const response = await lastValueFrom(request);

    switch (response.status) {
      case 200:
        this.changeClickState(this.registerClicked);
        this.router.navigate([ '/dashboard' ]);
        break;
      default:
        this.statusMessage = 'Wrong user credentials.';
        break;
    }

    this.isLoading = false;
  }
}
