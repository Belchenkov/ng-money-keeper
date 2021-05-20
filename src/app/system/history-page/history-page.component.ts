import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, zip } from 'rxjs';

import { CategoryService } from '../shared/services/category.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  sub1$: Subscription;

  categories: Category[] = [];
  events: AppEvent[] = [];
  isLoaded = false;
  chartData = [];

  constructor(
    private categoriesService: CategoryService,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.sub1$ = zip(
      this.categoriesService.getCategories(),
      this.eventService.getEvents(),
    ).subscribe((data: [Category[], AppEvent[]]) => {
      [this.categories, this.events] = data;
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach(cat => {
      const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce( (total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
  }
}
