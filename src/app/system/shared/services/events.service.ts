import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { AppEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.post('/events', event);
  }

  getEvents(): Observable<AppEvent[]> {
    return this.get('/events');
  }

  getEventById(id: string): Observable<AppEvent> {
    return this.get(`/events/${id}`);
  }

}
