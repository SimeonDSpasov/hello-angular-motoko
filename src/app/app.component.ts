import { Component, effect } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService } from './services/user-service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    LandingComponent,
    HttpClientModule,
    FooterComponent,
    RouterOutlet,
    MaintenanceComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {
    this.checkForMaintenance();
    this.init();

    effect(() => {
      this.userService.user();

      this.isLogged = this.userService.isUserLogged();
    });
  }

  public user!: User | null;
  public serverStatus: number = 200;
  public isFooterToBeLoaded = true;
  public isLogged = false;
  public isAdmin = false;
  public isMaintenance = false;

  private async init(): Promise<void> {
    await this.checkForMaintenance();

    if (this.isMaintenance) {
      return;
    }

    await this.userService.setUserFromDatabase();
  }

  private async checkForMaintenance(): Promise<void> {
    // const request = this.requestsMaintenanceService.checkForMaintenance();
    // const responseStatus = await lastValueFrom(request);

    // this.serverStatus = responseStatus;
    // // this.serverStatus = 200;
  }
}
