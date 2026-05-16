import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { BaseTableComponent } from './basetable.component';

describe('BaseTableComponent', () => {
  let component: BaseTableComponent;
  let fixture: ComponentFixture<BaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTableComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
