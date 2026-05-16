import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { AdresseEditComponent } from './adresse-edit.component';

describe('AdresseEditComponent', () => {
  let component: AdresseEditComponent;
  let fixture: ComponentFixture<AdresseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresseEditComponent],
      providers: [
        ...commonTestProviders,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { adresse: { geschlecht: 'm' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdresseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
