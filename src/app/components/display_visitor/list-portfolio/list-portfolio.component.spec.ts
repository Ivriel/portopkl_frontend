import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPortfolioComponent } from './list-portfolio.component';

describe('ListPortfolioComponent', () => {
  let component: ListPortfolioComponent;
  let fixture: ComponentFixture<ListPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
