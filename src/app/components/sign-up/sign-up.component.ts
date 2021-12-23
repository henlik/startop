import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', );

// CustomValidators.equalTo(password)

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   email: [null, Validators.compose([Validators.required])],
    //   // tslint:disable-next-line - Disables all , CustomValidators.email
    //   password: password,
    //   // tslint:disable-next-line - Disables all
    //   confirmPassword: confirmPassword
    // });
  }

  // onSubmit(): void {
  //   this.router.navigate(['/']);
  // }

}
