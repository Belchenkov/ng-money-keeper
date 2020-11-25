import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() categories: Category[] = [];

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let { amount } = form.value;
    const { description, category, type } = form.value;

    if (amount < 0) {
      amount *= -1;
    }

    const event = new AppEvent(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description
    );
  }

}
