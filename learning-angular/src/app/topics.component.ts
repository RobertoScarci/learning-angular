import { Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { TopicsService, Topic } from './topics';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <section class="topics">
      <header>
        <div>
          <h2>Learning Topics</h2>
          <p>Total minutes: {{ totalMinutes$ | async }}</p>
        </div>
        <div class="filters">
          <button type="button" [class.active]="selectedLevel === 'all'" (click)="setLevel('all')">All</button>
          <button type="button" [class.active]="selectedLevel === 'beginner'" (click)="setLevel('beginner')">Beginner</button>
          <button type="button" [class.active]="selectedLevel === 'intermediate'" (click)="setLevel('intermediate')">Intermediate</button>
          <button type="button" [class.active]="selectedLevel === 'advanced'" (click)="setLevel('advanced')">Advanced</button>
        </div>
      </header>

      <ul>
        <li *ngFor="let topic of filteredTopics$ | async">
          <div>
            <strong>{{ topic.title }}</strong>
            <span class="pill">{{ topic.level }}</span>
          </div>
          <small>{{ topic.minutes }} min</small>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    .topics { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin-top: 1.5rem; }
    header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6; }
    li:last-child { border-bottom: none; }
    .pill { margin-left: 0.5rem; padding: 0.15rem 0.5rem; border-radius: 12px; background: #eef2ff; color: #4338ca; font-size: 0.8rem; text-transform: capitalize; }
    small { color: #6b7280; }
    .filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .filters button { border: 1px solid #e5e7eb; background: #f8fafc; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
    .filters button.active { border-color: #4338ca; color: #4338ca; background: #eef2ff; }
  `]
})
export class TopicsComponent {
  private topicsService = inject(TopicsService);

  selectedLevel: 'all' | 'beginner' | 'intermediate' | 'advanced' = 'all';

  topics$: Observable<Topic[]> = this.topicsService.getTopics();

  filteredTopics$: Observable<Topic[]> = this.topics$.pipe(
    map(items =>
      this.selectedLevel === 'all'
        ? items
        : items.filter(t => t.level === this.selectedLevel)
    )
  );

  totalMinutes$: Observable<number> = this.topics$.pipe(
    map(items => items.reduce((sum, t) => sum + t.minutes, 0))
  );

  setLevel(level: 'all' | 'beginner' | 'intermediate' | 'advanced') {
    this.selectedLevel = level;
  }
}
