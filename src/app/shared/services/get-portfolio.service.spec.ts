import { TestBed } from '@angular/core/testing';

import { GetPortfolioService } from './get-portfolio.service';

describe('GetPortfolioService', () => {
  let service: GetPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
