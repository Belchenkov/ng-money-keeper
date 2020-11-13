import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BillService {
  apiUrl: string = environment.apiUrl;
  fixerAccessKey: string = environment.fixerAccessKey;

  constructor(
    private http: HttpClient
  ) { }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/bill`);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.fixerAccessKey}`);
  }
}
