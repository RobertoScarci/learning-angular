import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <main class="page">
      <h1>Topic: {{ title$ | async }}</h1>
      <p>Here we could load more details about this topic from an API.</p>
    </main>
  `,
})
export class TopicDetailComponent {
  title$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.title$ = route.paramMap.pipe(
      map(params => params.get('title') ?? '')
    );
  }
}