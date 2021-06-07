import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../../shared/services/events.service';
import { CategoryService } from '../../shared/services/category.service';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  sub1$: Subscription;

  event: AppEvent;
  category: Category;

  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private categoriesService: CategoryService
  ) { }

  ngOnInit(): void {
    this.sub1$ = this.route.params
      .subscribe((params: Params) => {
        this.eventService.getEventById(params.id).subscribe((event: AppEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category).subscribe((category: Category) => {
            this.category = category;
            this.isLoaded = true;
          });
        });
      });
  }

  ngOnDestroy() {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
  }
}
