import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAboutMeDisplayComponent } from './setting-about-me-display.component';

describe('SettingAboutMeDisplayComponent', () => {
  let component: SettingAboutMeDisplayComponent;
  let fixture: ComponentFixture<SettingAboutMeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAboutMeDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAboutMeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
