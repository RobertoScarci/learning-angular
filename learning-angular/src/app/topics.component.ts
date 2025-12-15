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
        <h2>Learning Topics</h2>
        <p>Total minutes: {{ totalMinutes$ | async }}</p>
      </header>

      <ul>
        <li *ngFor="let topic of topics$ | async">
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
    header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6; }
    li:last-child { border-bottom: none; }
    .pill { margin-left: 0.5rem; padding: 0.15rem 0.5rem; border-radius: 12px; background: #eef2ff; color: #4338ca; font-size: 0.8rem; text-transform: capitalize; }
    small { color: #6b7280; }
  `]
})
export class TopicsComponent {
  private topicsService = inject(TopicsService);

  topics$: Observable<Topic[]> = this.topicsService.getTopics();

  totalMinutes$: Observable<number> = this.topics$.pipe(
    map(items => items.reduce((sum, t) => sum + t.minutes, 0))
  );
}
