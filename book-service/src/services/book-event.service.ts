import {Observer} from '../observers/observer.interface';

export class BookEventService {
  private observers: Observer[] = [];
  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  notify(message: string): void {
    console.log('NOTIFY ENTERED');
    console.log('Observer count:', this.observers.length);
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(message);
    }
  }
}
