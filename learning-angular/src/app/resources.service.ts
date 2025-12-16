import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Resource {
  title: string;
  url: string;
  type: 'docs' | 'tutorial';
}

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private http = inject(HttpClient);

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>('/assets/resources.json');
  }
}