import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    LoginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.LoginForm.value.email, this.LoginForm.value.password).subscribe();
    
  }
}
