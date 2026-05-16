import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestProviders } from '@app/testing/test-providers';

import { AttachmentAddComponent } from './attachment-add.component';

describe('AttachmentAddComponent', () => {
  let component: AttachmentAddComponent;
  let fixture: ComponentFixture<AttachmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AttachmentAddComponent],
    providers: commonTestProviders
})
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
