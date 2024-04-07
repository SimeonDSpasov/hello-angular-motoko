import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScrollBlockService {

  private bodyElement = document.querySelector('body') as HTMLBodyElement;

  public activate(): void {
    const yOffset = window.scrollY;

    this.bodyElement.style.position = 'fixed';
    this.bodyElement.style.top = '-' + yOffset + 'px';
    this.bodyElement.style.height = 'calc(100% + ' + yOffset + 'px)';
  }

  public deactivate(): void {
    const top = Math.abs(parseInt(this.bodyElement.style.top));

    this.bodyElement.style.position = '';
    this.bodyElement.style.top = '';
    this.bodyElement.style.height = '100%';

    window.scrollTo(0, top)
  }

}
