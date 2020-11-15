import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { environment } from '../../../../environments/environment';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  fixerAccessKey: string = environment.fixerAccessKey;

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get(`/bill`);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.fixerAccessKey}`);
  }
}
