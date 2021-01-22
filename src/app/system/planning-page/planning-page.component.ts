import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoryService } from '../shared/services/category.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  sub$: Subscription;

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: AppEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.sub$ = combineLatest([
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ]).subscribe((data: [Bill, Category[], AppEvent[]]) => {
      [this.bill, this.categories, this.events] = data;
      this.isLoaded = true;
    });
  }

  getCategoryCost(category: Category): number {
    const catOutcomeEvents = this.events.filter(event => event.category === category.id && event.type === 'outcome');

    return catOutcomeEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
