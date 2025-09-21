import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVisitorComponent } from './display-visitor.component';

describe('DisplayVisitorComponent', () => {
  let component: DisplayVisitorComponent;
  let fixture: ComponentFixture<DisplayVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
