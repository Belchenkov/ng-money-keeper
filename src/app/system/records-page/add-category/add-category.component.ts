import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  sub$: Subscription;
  @Output() categoryAdd = new EventEmitter<Category>();

  constructor(
    private categoryService: CategoryService
  ) { }

  onSubmit(form: NgForm): void {
    const { name } = form.value;
    let { capacity } = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(capacity, name);

    this.categoryService.addCategory(category)
      .subscribe((addedCategory: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });

        this.categoryAdd.emit(addedCategory);
      });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
