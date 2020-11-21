import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdd(category: Category): void {
    this.categories.push(category);
  }

  categoryUpdated(category: Category): void {
    const idx = this.categories.findIndex(c => c.id === +category.id);
    this.categories[idx] = category;
  }

}
