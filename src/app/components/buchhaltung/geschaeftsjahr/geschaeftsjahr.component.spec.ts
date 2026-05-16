import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { GeschaeftsjahrComponent } from './geschaeftsjahr.component';

describe('GeschaeftsjahrComponent', () => {
  let component: GeschaeftsjahrComponent;
  let fixture: ComponentFixture<GeschaeftsjahrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GeschaeftsjahrComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(GeschaeftsjahrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
