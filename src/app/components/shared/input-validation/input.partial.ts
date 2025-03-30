import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { InputDirective } from './input.directive';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cr-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'input.css',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      class="{{ cssPrefix }}-field {{ typeCss }}"
      [class.cr-invalid-form]="invalidForm"
    >
      <label class="cr-label" for="{{ for }}">{{ placeholder }}</label>
      <ng-content></ng-content>
      <span class="cr-required"></span>
      <span class="cr-feedback" [class.cr-form-feedback]="invalidForm">{{
        errorText
      }}</span>
      <span class="cr-help">
        <ng-content select="[helptext]"></ng-content>
      </span>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrInputPartial),
      multi: true,
    },
  ],
})
export class CrInputPartial implements AfterContentInit {
  @ContentChild(InputDirective, { static: true })
  inputDirective!: InputDirective;

  @Input() placeholder: string;
  @Input() cssPrefix: string = 'cr';
  @Input() error: string;
  @Input() invalidForm: boolean;
  @Input() for!: string;
  @Input() type!: string;

  get typeCss(): string {
    return this.type ? `${this.cssPrefix}-${this.type}` : '';
  }

  get errorText(): string {
    return this.error || this.inputDirective?.errorText();
  }

  ngAfterContentInit() {
    if (this.inputDirective) {
      const element = this.inputDirective.element;

      this.for = element.id;
      element.classList.add(`cr-input`);
      element.setAttribute('placeholder', this.placeholder);
    }
  }
}
