import { Injectable } from '@angular/core';
import { AppState, initialState } from '../models/state/common.model';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private STORAGE_KEY = 'appState';
  private state = this.getStateFromLocalStorage();
  private stateSource = new BehaviorSubject<AppState>(this.state);
  public state$ = this.stateSource.asObservable();

  public reset() {
    this.state = initialState;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  constructor() {}

  // PUBLIC

  public setIsLoading(isLoading: boolean) {
    this.state = { ...this.state, isLoading };
    this.updateStore();
  }

  // Selectors

  public selectIsLoading(): Observable<boolean> {
    return this.state$.pipe(
      map((state) => state.isLoading),
      distinctUntilChanged()
    );
  }

  // PRIVATE

  private updateStore() {
    this.stateSource.next(this.state);
    this.saveStateToLocalStorage(this.state);
  }

  private saveStateToLocalStorage(appState: AppState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appState));
  }

  private getStateFromLocalStorage(): AppState {
    if (typeof localStorage !== 'undefined') {
      const state = localStorage.getItem(this.STORAGE_KEY);
      return state ? this.getParsedState(state) : initialState;
    } else {
      // Handle the case where localStorage is not available (e.g., during SSR)
      return initialState;
    }
  }

  private getParsedState(state: string): AppState {
    return JSON.parse(state) as AppState;
  }
}
