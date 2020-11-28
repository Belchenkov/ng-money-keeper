import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Observable  } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`/users?email=${email}`)
      .pipe(
        map((user: User) => user[0] || null)
      );
  }

  register(user: User): Observable<User> {
    return this.post(`/users`, user);
  }
}
