import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[libHideImageOnLoad]'
})
export class HideImageOnLodeDirective implements OnInit, OnDestroy, OnChanges{

  @Input()
  public src: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.elRef.nativeElement.addEventListener('load', this.showElement.bind(this));
  }

  public ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('load', this.showElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
      this.renderer.setAttribute(this.elRef.nativeElement, 'src', changes.src.currentValue);
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  private showElement(): void {
    this.elRef.nativeElement.style.display = 'block';
  }

}
