import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, zip } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.subscription = zip(
      this.billService.getBill(),
      this.billService.getCurrency(),
    ).subscribe((data: [Bill, any]) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
