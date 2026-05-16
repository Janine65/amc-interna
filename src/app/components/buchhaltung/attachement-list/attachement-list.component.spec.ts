import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { AttachementListComponent } from './attachement-list.component';

describe('AttachementListComponent', () => {
  let component: AttachementListComponent;
  let fixture: ComponentFixture<AttachementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachementListComponent],
      providers: [
        ...commonTestProviders,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: { journalid: 0, jahr: '2024', type: '', editable: false },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttachementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
