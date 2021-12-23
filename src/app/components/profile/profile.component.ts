import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  step = 0;

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
  user: any;

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
     }

  ngOnInit(): void {
    console.log(this.authService.userData);
  }

}
