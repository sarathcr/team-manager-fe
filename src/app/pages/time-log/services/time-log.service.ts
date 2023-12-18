import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../../core/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class TimeLogService<T> extends ApiService<T> {
  constructor(
    http: HttpClient,
    store: StoreService,
    protected service: ApiService<T>
  ) {
    super(http, store);
  }
}
