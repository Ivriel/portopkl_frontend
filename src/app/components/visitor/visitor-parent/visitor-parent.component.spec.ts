import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorParentComponent } from './visitor-parent.component';

describe('VisitorParentComponent', () => {
  let component: VisitorParentComponent;
  let fixture: ComponentFixture<VisitorParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
