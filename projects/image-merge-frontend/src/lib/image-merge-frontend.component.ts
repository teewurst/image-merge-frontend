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
import {LayerImage} from './models/layer-object.interface';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, throttleTime} from 'rxjs/operators';
import {ConfigService} from './services/config.service';

@Component({
    selector: 'lib-image-merge-frontend',
    templateUrl: './image-merge-frontend.component.html',
    styleUrls: ['./image-merge-frontend.component.less']
})
export class ImageMergeFrontendComponent implements OnInit, AfterViewInit, OnDestroy {

    public ratio: number;

    // Inputs Outputs
    @Input()
    public layerImage: LayerImage;
    @Input()
    public activeLayer: LayerImage;
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

    constructor(public config: ConfigService) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.resizeThrottle$
                .pipe(
                    throttleTime(100),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.config.getPlainSize().y;
                })
        );
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.config.getPlainSize().y);
        this.activeLayer = this.layerImage;
        this.changeActiveLayer.emit(this.layerImage);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });
        this.resizeThrottle$.complete();
    }

    public onIconClick(layerImage: LayerImage): void {
        this.activeLayer.active = false;
        this.activeLayer = layerImage;
        this.activeLayer.active = true;
        this.changeActiveLayer.emit(this.activeLayer);
    }

}
