import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, zip } from 'rxjs';
import * as moment from 'moment';

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
  chartData = [];
  filteredEvents: AppEvent[] = [];
  isLoaded = false;
  isFilterVisible = false;

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

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
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

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
    .filter( e => {
      return filterData.types.indexOf(e.type) !== -1;
    })
    .filter(e => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    })
    .filter(e => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });

    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
  }
}
