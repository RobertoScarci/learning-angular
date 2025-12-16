import { Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { ResourcesService, Resource } from '../resources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <main class="page">
      <h1>About this app</h1>
      <p>This app is for learning Angular step by step.</p>

      <section class="resources">
        <h2>Useful resources</h2>
        <ul>
          <li *ngFor="let r of resources$ | async">
            <a [href]="r.url" target="_blank">{{ r.title }}</a>
            <small>({{ r.type }})</small>
          </li>
        </ul>
      </section>
    </main>
  `,
})
export class AboutComponent {
  private resourcesService = inject(ResourcesService);
  resources$: Observable<Resource[]> = this.resourcesService.getResources();
}