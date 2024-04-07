import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-apikeys',
  standalone: true,
  imports: [
  ],
  templateUrl: './find-apikeys.component.html',
  styleUrls: ['./find-apikeys.component.css']
})

export class FindApiKeysComponent {

  constructor (public router: Router) { }

}
