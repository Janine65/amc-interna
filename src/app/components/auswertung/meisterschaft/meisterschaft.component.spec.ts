import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { MeisterschaftComponent } from './meisterschaft.component';

describe('MeisterschaftComponent', () => {
  let component: MeisterschaftComponent;
  let fixture: ComponentFixture<MeisterschaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MeisterschaftComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(MeisterschaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
