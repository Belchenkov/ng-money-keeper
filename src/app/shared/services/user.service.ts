import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Observable  } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3333/users?email=${email}`)
      .pipe(
        map((user: User) => user[0] || null)
      );
  }
}
