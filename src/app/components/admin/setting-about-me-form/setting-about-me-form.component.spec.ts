import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAboutMeFormComponent } from './setting-about-me-form.component';

describe('SettingAboutMeFormComponent', () => {
  let component: SettingAboutMeFormComponent;
  let fixture: ComponentFixture<SettingAboutMeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAboutMeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAboutMeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
