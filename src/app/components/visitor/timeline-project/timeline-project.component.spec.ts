import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineProjectComponent } from './timeline-project.component';

describe('TimelineProjectComponent', () => {
  let component: TimelineProjectComponent;
  let fixture: ComponentFixture<TimelineProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
