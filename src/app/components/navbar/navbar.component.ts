import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';

import { UserService } from './../../../../src/app/services/user-service';
import { RegisterComponent } from './../auth/register/register.component';

import { ScrollBlockService } from './../../services/scroll-block.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SvgIconComponent,
    RegisterComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isLogged!: boolean;

  constructor(
    public userService: UserService,
    public scrollBlockService: ScrollBlockService,
  ) {}

  public loginClicked: boolean = false;
  public registerClicked: boolean = false;

  public registerClick(): void {
    this.scrollBlockService.activate();
    this.loginClicked = false;
    this.registerClicked = true;
  }

  public loginClick(): void {
    this.scrollBlockService.activate();
    this.registerClicked = false;
    this.loginClicked = true;
  }

  public closeAuthModal(): void {
    this.scrollBlockService.deactivate();
    this.loginClicked = false;
    this.registerClicked = false;
  }

  public changeState(): void {
    this.loginClicked = !this.loginClicked;
    this.registerClicked = !this.registerClicked;
  }

  public goToDashboard() {
  }

  public logOut(): void {
    this.userService.logout();
  }

  public toggleCheckbox(): void {
    // Get the checkbox element by its ID
    const checkbox = document.getElementById('my-drawer-3') as HTMLInputElement;
  
    // Check if the checkbox is currently checked
    if (checkbox.checked) {
      // If checked, uncheck it
      checkbox.checked = false;
    } else {
      // If unchecked, check it
      checkbox.checked = true;
    }
  }
  
}
