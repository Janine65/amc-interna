import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AnlaesseComponent } from './anlaesse.component';

describe('AnlaesseComponent', () => {
  let component: AnlaesseComponent;
  let fixture: ComponentFixture<AnlaesseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnlaesseComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AnlaesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
