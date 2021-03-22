import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
export declare class HideImageOnLodeDirective implements OnInit, OnDestroy, OnChanges {
    private elRef;
    private renderer;
    src: string;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private showElement;
}
