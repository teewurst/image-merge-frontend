import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
export class HideImageOnLodeDirective {
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.elRef.nativeElement.addEventListener('load', this.showElement.bind(this));
    }
    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('load', this.showElement);
    }
    ngOnChanges(changes) {
        if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
            this.renderer.setAttribute(this.elRef.nativeElement, 'src', changes.src.currentValue);
            this.elRef.nativeElement.style.display = 'none';
        }
    }
    showElement() {
        this.elRef.nativeElement.style.display = 'block';
    }
}
HideImageOnLodeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libHideImageOnLoad]'
            },] }
];
HideImageOnLodeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
HideImageOnLodeDirective.propDecorators = {
    src: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS1pbWFnZS1vbi1sb2RlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9pbWFnZS1tZXJnZS1mcm9udGVuZC9pbWFnZS1tZXJnZS1mcm9udGVuZC9wcm9qZWN0cy9pbWFnZS1tZXJnZS1mcm9udGVuZC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlL2hpZGUtaW1hZ2Utb24tbG9kZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFnQyxTQUFTLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS25ILE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsWUFBb0IsS0FBaUIsRUFBVSxRQUFtQjtRQUE5QyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUFFL0QsUUFBUTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNuRCxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7OztZQUprQixVQUFVO1lBQXVDLFNBQVM7OztrQkFPMUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYkhpZGVJbWFnZU9uTG9hZF0nXG59KVxuZXhwb3J0IGNsYXNzIEhpZGVJbWFnZU9uTG9kZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXN7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNyYzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLnNob3dFbGVtZW50LmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5zaG93RWxlbWVudCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnNyYyAmJiBjaGFuZ2VzLnNyYy5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuc3JjLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3NyYycsIGNoYW5nZXMuc3JjLmN1cnJlbnRWYWx1ZSk7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dFbGVtZW50KCk6IHZvaWQge1xuICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG59XG4iXX0=