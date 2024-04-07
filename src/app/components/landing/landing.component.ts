import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HowItWorksComponent } from './how-it-works/how-it-works.component';

@Component({
  selector: 'app-landing',
  imports: [
    HowItWorksComponent,
  ],
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent {

}
