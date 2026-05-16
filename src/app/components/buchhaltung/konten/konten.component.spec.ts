import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { KontenComponent } from './konten.component';

describe('KontenComponent', () => {
  let component: KontenComponent;
  let fixture: ComponentFixture<KontenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KontenComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(KontenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
