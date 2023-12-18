import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { KeyValueMap } from '../models/common';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  constructor(protected http: HttpClient, protected store: StoreService) {}

  public uploadFile(
    file: File,
    // extraData: KeyValueMap<any>,
    URL: string
  ): Observable<T> {
    this.store.setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    // for (const data in extraData) {
    //   formData.append(data, extraData[data]);
    // }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<T>(URL, formData, { headers }).pipe(
      tap((response: T) => {
        this.store.setIsLoading(false);
      })
    );
  }
}
