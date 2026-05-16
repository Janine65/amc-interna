import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AppFooterComponent } from './app.footer.component';

describe('AppFooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFooterComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
