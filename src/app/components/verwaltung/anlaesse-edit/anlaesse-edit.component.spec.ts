import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { AnlaesseEditComponent } from './anlaesse-edit.component';

describe('AnlaesseEditComponent', () => {
  let component: AnlaesseEditComponent;
  let fixture: ComponentFixture<AnlaesseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnlaesseEditComponent],
      providers: [
        ...commonTestProviders,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { anlass: { datum_date: new Date() } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnlaesseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
