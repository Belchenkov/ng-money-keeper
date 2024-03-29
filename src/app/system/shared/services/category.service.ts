import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.get('/categories');
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`/categories/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('/categories', category);
  }

  editCategory(category: Category): Observable<Category> {
    return this.put(`/categories/${category.id}`, category);
  }

}
