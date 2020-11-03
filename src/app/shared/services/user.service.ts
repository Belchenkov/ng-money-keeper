import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Observable  } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users?email=${email}`)
      .pipe(
        map((user: User) => user[0] || null)
      );
  }

  register(user: User): Observable<User> {
    return this.http.post(`${this.apiUrl}/users`, user)
      .pipe(
        map((response: User) => response)
      );
  }
}
