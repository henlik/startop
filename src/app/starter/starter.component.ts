import { Component, AfterViewInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../components/auth.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit {
  scanResult: any='';
    constructor(public authService: AuthService, public router: Router, public ngZone: NgZone){}


  ngAfterViewInit() {}

  onCodeResult(result: string){
    this.scanResult = result;
  }
}
