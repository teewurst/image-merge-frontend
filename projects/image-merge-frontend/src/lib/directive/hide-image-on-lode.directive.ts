import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[libHideImageOnLode]'
})
export class HideImageOnLodeDirective implements OnInit, OnDestroy, OnChanges{

  @Input('src')
  public source: string;

  constructor(private elRef: ElementRef) {}

  public ngOnInit(): void {
    this.elRef.nativeElement.addEventListener('mouseenter', this.showElement);
  }

  public ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('mouseenter', this.showElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  private showElement(): void {
    this.elRef.nativeElement.style.display = 'block';
  }

}
