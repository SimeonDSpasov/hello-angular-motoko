import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {

  @Input() allowMultiLine = false;
  @Input() allowNegative = false;
  @Input() allowDecimal = false;
  @Input() maxLength = 0;

  private regex!: RegExp;

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    this.validate(event, event.key === 'Enter' ? '\n' : event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: Event) {
    const pastedText = (window as any).clipboardData && (window as any).clipboardData.getData('Text') // If IE, use window
      || (event as ClipboardEvent) && (event as ClipboardEvent).clipboardData!.getData('text/plain'); // Non-IE browsers

    this.validate(event, pastedText);
  }

  @HostListener('cut', ['$event'])
  onCut(event: Event) {
    this.validate(event, '');
  }

  validate(event: Event, text: string) {
    const element = event.target as HTMLInputElement;

    const newValue = (element.value.substring(0, element.selectionStart!)
      + text + element.value.substring(element.selectionEnd!));

    if (!this.regex) {
      this.regex = new RegExp(
        '^' +
          (this.allowNegative ? '-?' : '') +
          (this.allowDecimal ? '((\\d+\\.?)|(\\.?))\\d*' : '\\d*') +
          '$'
      );
    }

    const lines = this.allowMultiLine ? newValue.split('\n') : [newValue];

    for (const line of lines) {
      const lineText = line.replace('\r', '');

      if (this.maxLength && lineText.length > this.maxLength || !lineText.match(this.regex)) {
        event.preventDefault();

        return;
      }
    }
  }

}
