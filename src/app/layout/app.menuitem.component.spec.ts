import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AppMenuitemComponent } from './app.menuitem.component';

describe('AppMenuitemComponent', () => {
  let component: AppMenuitemComponent;
  let fixture: ComponentFixture<AppMenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuitemComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenuitemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('index', 0);
    component.item = { label: 'Test' };
    component.root = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
