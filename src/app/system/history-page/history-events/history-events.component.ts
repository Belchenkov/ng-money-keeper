import { Component, Input, OnInit } from '@angular/core';

import { AppEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories = [];
  @Input() events: AppEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit(): void {
    this.events.forEach(e => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: AppEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string): void {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип',
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
