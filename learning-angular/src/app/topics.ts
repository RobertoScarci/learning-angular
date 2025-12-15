import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Topic {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  minutes: number;
}

@Injectable({ providedIn: 'root' })
export class TopicsService {
  getTopics() {
    return of<Topic[]>([
      { title: 'Components & Templates', level: 'beginner', minutes: 20 },
      { title: 'Dependency Injection', level: 'beginner', minutes: 15 },
      { title: 'Routing Basics', level: 'intermediate', minutes: 25 },
      { title: 'HttpClient & Observables', level: 'intermediate', minutes: 30 },
      { title: 'State with Signals/RxJS', level: 'advanced', minutes: 35 },
    ]);
  }
}
