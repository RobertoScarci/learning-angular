import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <main class="page">
      <h1>About this app</h1>
      <p>This app is for learning Angular step by step: components, services, and routing.</p>
    </main>
  `,
})
export class AboutComponent {}