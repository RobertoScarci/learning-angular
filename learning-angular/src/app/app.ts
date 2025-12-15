import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'learning-angular';

  tasks = [
    { title: 'Run the app with ng serve', done: false },
    { title: 'Inspect app.ts and app.html', done: false },
    { title: 'Change the title text', done: false },
    { title: 'Add a new task to the list', done: false },
  ];

  get completedCount() {
    return this.tasks.filter(t => t.done).length;
  }
}
