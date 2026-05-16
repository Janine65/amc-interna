import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { KtoAuswertungComponent } from './kto-auswertung.component';

describe('KtoAuswertungComponent', () => {
  let component: KtoAuswertungComponent;
  let fixture: ComponentFixture<KtoAuswertungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KtoAuswertungComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(KtoAuswertungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
