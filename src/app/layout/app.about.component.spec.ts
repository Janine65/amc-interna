import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AppAboutComponent } from './app.about.component';

describe('AppAboutComponent', () => {
  let component: AppAboutComponent;
  let fixture: ComponentFixture<AppAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAboutComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AppAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
