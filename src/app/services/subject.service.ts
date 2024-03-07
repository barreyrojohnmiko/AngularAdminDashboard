import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private nameSubject = new BehaviorSubject<string>('');
  name$ = this.nameSubject.asObservable();

  setName(name: string) {
    this.nameSubject.next(name);
  }
}
