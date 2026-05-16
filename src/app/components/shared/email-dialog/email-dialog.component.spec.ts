import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { EmailDialogComponent } from './email-dialog.component';

describe('EmailDialogComponent', () => {
  let component: EmailDialogComponent;
  let fixture: ComponentFixture<EmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailDialogComponent],
      providers: [
        ...commonTestProviders,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              emailBody: {
                email_an: '',
                email_cc: '',
                email_bcc: '',
                email_subject: '',
                email_body: '',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
