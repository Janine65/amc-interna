import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AuswertungComponent } from './auswertung.component';

describe('AuswertungComponent', () => {
  let component: AuswertungComponent;
  let fixture: ComponentFixture<AuswertungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuswertungComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(AuswertungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
