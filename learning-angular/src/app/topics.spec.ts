import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TopicsComponent } from './topics.component';
import { TopicsService, Topic } from './topics';

class FakeTopicsService {
  getTopics() {
    const data: Topic[] = [
      { title: 'A', level: 'beginner', minutes: 10 },
      { title: 'B', level: 'intermediate', minutes: 20 },
      { title: 'C', level: 'advanced', minutes: 30 },
    ];
    return of(data);
  }
}

describe('TopicsComponent', () => {
  let component: TopicsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopicsComponent],
      providers: [{ provide: TopicsService, useClass: FakeTopicsService }],
    });

    const fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter topics by level', (done) => {
    component.selectedLevel = 'beginner';

    component.filteredTopics$.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].level).toBe('beginner');
      done();
    });
  });
});