import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
  input,
  contentChild,
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
      class="{{ cssPrefix() }}-field {{ typeCss }}"
      [class.cr-invalid-form]="invalidForm()"
    >
      <label class="cr-label" for="{{ for }}">{{ placeholder() }}</label>
      <ng-content></ng-content>
      <span class="cr-required"></span>
      <span class="cr-feedback" [class.cr-form-feedback]="invalidForm()">{{
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
  readonly inputDirective = contentChild.required(InputDirective);

  readonly placeholder = input<string>(undefined);
  readonly cssPrefix = input<string>('cr');
  readonly error = input<string>(undefined);
  readonly invalidForm = input<boolean>(undefined);
  @Input() for!: string;
  readonly type = input<string>('text');

  get typeCss(): string {
    const type = this.type();
    return type ? `${this.cssPrefix()}-${type}` : '';
  }

  get errorText(): string {
    return this.error() || this.inputDirective()?.errorText();
  }

  ngAfterContentInit() {
    const inputDirective = this.inputDirective();
    if (inputDirective) {
      const element = inputDirective.element;

      this.for = element.id;
      element.classList.add(`cr-input`);
      element.setAttribute('placeholder', this.placeholder());
    }
  }
}
