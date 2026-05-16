import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { KegelkasseComponent } from './kegelkasse.component';

describe('KegelkasseComponent', () => {
  let component: KegelkasseComponent;
  let fixture: ComponentFixture<KegelkasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KegelkasseComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(KegelkasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
