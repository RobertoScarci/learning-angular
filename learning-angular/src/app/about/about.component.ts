import { Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourcesService, Resource } from '../resources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, AsyncPipe, ReactiveFormsModule],
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

      <section class="feedback">
        <h2>Send feedback</h2>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            Name
            <input type="text" formControlName="name" />
            <small *ngIf="form.get('name')?.touched && form.get('name')?.invalid">
              Name is required.
            </small>
          </label>

          <label>
            Email
            <input type="email" formControlName="email" />
            <small *ngIf="form.get('email')?.touched && form.get('email')?.errors?.['required']">
              Email is required.
            </small>
            <small *ngIf="form.get('email')?.touched && form.get('email')?.errors?.['email']">
              Please enter a valid email.
            </small>
          </label>

          <label>
            Message
            <textarea rows="3" formControlName="message"></textarea>
            <small *ngIf="form.get('message')?.touched && form.get('message')?.errors?.['required']">
              Message is required.
            </small>
            <small *ngIf="form.get('message')?.touched && form.get('message')?.errors?.['minlength']">
              Message must be at least 10 characters.
            </small>
          </label>

          <button type="submit" [disabled]="form.invalid">Send</button>
        </form>
      </section>
    </main>
  `,
})
export class AboutComponent {
  private resourcesService = inject(ResourcesService);
  resources$: Observable<Resource[]> = this.resourcesService.getResources();

  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Feedback form value:', this.form.value);
    this.form.reset();
  }
}