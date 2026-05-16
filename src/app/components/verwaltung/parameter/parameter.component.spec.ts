import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { ParameterComponent } from './parameter.component';

describe('ParameterComponent', () => {
  let component: ParameterComponent;
  let fixture: ComponentFixture<ParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
