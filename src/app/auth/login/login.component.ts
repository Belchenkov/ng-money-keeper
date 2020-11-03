import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  // tslint:disable-next-line:typedef
  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const { email, password } = this.form.value;

    this.userService.getUserByEmail(email).subscribe((user: User) => {
       if (!user || user.password !== password) {
         this.showMessage('Invalid Credentials');
         return false;
      }

       this.authService.login();
       window.localStorage.setItem('user', JSON.stringify(user));
       this.message.text = '';
       //this.router.navigate(['']);
    });
  }
}
