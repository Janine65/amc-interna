import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AdresseShowComponent } from './adresse-show.component';

describe('AdresseShowComponent', () => {
  let component: AdresseShowComponent;
  let fixture: ComponentFixture<AdresseShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AdresseShowComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(AdresseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
