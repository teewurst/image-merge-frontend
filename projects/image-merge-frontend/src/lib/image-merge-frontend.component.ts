import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {LayerObject} from 'projects/image-merge-frontend/src/lib/models/LayerObject.interface';
import {of} from "rxjs";
import {debounce, debounceTime, distinctUntilChanged, throttleTime} from "rxjs/operators";

@Component({
    selector: 'lib-image-merge-frontend',
    templateUrl: './image-merge-frontend.component.html',
    styleUrls: ['./image-merge-frontend.component.less']
})
export class ImageMergeFrontendComponent implements AfterViewInit {

    public relativeHeightBase = 1050;
    public ratio: number;
    @Input()
    public layerObjects: LayerObject[] = [];
    @ViewChild('imageMergeFrontend')
    public wrapperElement: ElementRef;

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        of({})
            .pipe(
                throttleTime(300),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.relativeHeightBase;
            })
            .unsubscribe();
    }

    constructor() {
    }

    ngAfterViewInit(): void {
        this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.relativeHeightBase;
    }

}
