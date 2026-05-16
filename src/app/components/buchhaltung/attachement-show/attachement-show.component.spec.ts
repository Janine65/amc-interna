import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AttachementShowComponent } from './attachement-show.component';

describe('AttachementShowComponent', () => {
  let component: AttachementShowComponent;
  let fixture: ComponentFixture<AttachementShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AttachementShowComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(AttachementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
