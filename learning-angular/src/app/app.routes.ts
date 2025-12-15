import { Routes } from '@angular/router';
import { App } from './app';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: App },              // home page
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },            // fallback
];
