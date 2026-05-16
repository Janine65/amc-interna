import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { AnlassBookComponent } from './anlass-book.component';

describe('AnlassBookComponent', () => {
  let component: AnlassBookComponent;
  let fixture: ComponentFixture<AnlassBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnlassBookComponent],
      providers: [
        ...commonTestProviders,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { anlass: { id: 0 } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnlassBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
