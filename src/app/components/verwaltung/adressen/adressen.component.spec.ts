import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AdressenComponent } from './adressen.component';

describe('AdressenComponent', () => {
  let component: AdressenComponent;
  let fixture: ComponentFixture<AdressenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdressenComponent],
      providers: commonTestProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AdressenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
