import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[libHideImageOnLode]'
})
export class HideImageOnLodeDirective implements OnInit, OnDestroy, OnChanges{

  @Input()
  public src: string;

  constructor(private elRef: ElementRef) {}

  public ngOnInit(): void {
    this.elRef.nativeElement.addEventListener('load', this.showElement);
  }

  public ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('load', this.showElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.imageSource && changes.imageSource.currentValue !== changes.imageSource.previousValue) {
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  private showElement(): void {
    this.elRef.nativeElement.style.display = 'block';
  }

}
