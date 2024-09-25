import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private customLastLabelSubject = new BehaviorSubject<string | null>(null);
  customLastLabel$ = this.customLastLabelSubject.asObservable();

  setCustomLastLabel(label: string | null): void {
    this.customLastLabelSubject.next(label);
  }

  resetCustomLabel() {
    this.customLastLabelSubject.next(null);
  }
}
