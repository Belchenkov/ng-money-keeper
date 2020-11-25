import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  sub$: Subscription;

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.message = new Message('success', '');
    this.categoryChange();
  }

  categoryChange(): void {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm): void {
    const { name } = form.value;
    let { capacity } = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(capacity, name, +this.currentCategoryId);

    this.sub$ = this.categoryService.editCategory(category)
      .subscribe((updatedCategory: Category) => {
        this.categoryEdit.emit(updatedCategory);
        this.message.text = 'Категория успешно отредактирована';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
