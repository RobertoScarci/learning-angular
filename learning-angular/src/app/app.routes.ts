import { Routes } from '@angular/router';
import { App } from './app';
import { AboutComponent } from './about/about.component';
import { TopicDetailComponent } from './topic-detail.component'; 
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: App },              // home page
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },  
  { path: 'topics/:title', component: TopicDetailComponent },          // fallback
  { path: '**', redirectTo: '' },  
];
