import { TestBed } from '@angular/core/testing';

import { GetSettingService } from './get-setting.service';

describe('GetSettingService', () => {
  let service: GetSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
