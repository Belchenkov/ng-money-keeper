import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '../../shared/models/message.model';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = new Message('danger', '');

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      agree: new FormControl(false, [
        Validators.required,
        Validators.requiredTrue
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);

    this.userService.register(user)
      .subscribe((newUser: User) => {
        console.log(newUser);
        this.router.navigate(['/login'], {
          queryParams: {
            isLogin: true
          }
        });
      });
  }
}
