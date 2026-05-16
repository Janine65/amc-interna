import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { BaseeditComponent } from './baseedit.component';

describe('BaseeditComponent', () => {
  let component: BaseeditComponent;
  let fixture: ComponentFixture<BaseeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BaseeditComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(BaseeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
