import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Вы можете оставить этот метод пустым, так как инициализация уже выполнена в объявлении.
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg))
  }
}
