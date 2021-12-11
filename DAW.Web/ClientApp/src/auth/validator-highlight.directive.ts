import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appValidatorHighlight]'
})
export class ValidatorHighlightDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = "red"
  }

}
