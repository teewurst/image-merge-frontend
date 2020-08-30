import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {LayerImage} from 'projects/image-merge-frontend/src/lib/models/layer-object.interface';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, throttleTime} from 'rxjs/operators';

@Component({
    selector: 'lib-image-merge-frontend',
    templateUrl: './image-merge-frontend.component.html',
    styleUrls: ['./image-merge-frontend.component.less']
})
export class ImageMergeFrontendComponent implements OnInit, AfterViewInit, OnDestroy {

    public relativeHeightBase = 800;
    public ratio: number;
    private activeLayer: LayerImage;

    // Inputs Outputs
    @Input()
    public layerImage: LayerImage;

    @Output()
    public changeActiveLayer: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    // Subscriptions
    private subscriptions: Subscription[] = [];
    private resizeThrottle$: Subject<Event> = new Subject<Event>();

    // Element Refs
    @ViewChild('imageMergeFrontend')
    public wrapperElement: ElementRef;

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        this.resizeThrottle$.next(event);
    }

    constructor() {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.resizeThrottle$
                .pipe(
                    throttleTime(100),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.relativeHeightBase;
                })
        );
    }

    public ngAfterViewInit(): void {
        this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.relativeHeightBase;
        this.activeLayer = this.layerImage;
        this.changeActiveLayer.emit(this.layerImage);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });
        this.resizeThrottle$.complete();
    }

    public handleIconClick(layerImage: LayerImage): void {
        this.activeLayer.active = false;
        this.activeLayer = layerImage;
        this.activeLayer.active = true;
        this.changeActiveLayer.emit(this.activeLayer);
    }

}
