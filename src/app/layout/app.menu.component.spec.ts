import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AppMenuComponent } from './app.menu.component';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
