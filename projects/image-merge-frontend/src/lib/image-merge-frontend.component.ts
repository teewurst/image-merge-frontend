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
    private resizeThrottled$: Subject<void> = new Subject<void>();
    @Input()
    public layerImage: LayerImage;
    @Input()
    public activeLayer: LayerImage;
    @Output()
    public changeActiveLayer: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    // Subscriptions
    private subscriptions: Subscription[] = [];


    // Element Refs
    @ViewChild('imageMergeFrontendFiller')
    public fillerElement: ElementRef;

    public wrapperHeight: number;
    public wrapperWidth: number;

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        this.resizeThrottled$.next();
    }

    constructor(public config: ConfigService, private wrapperElement: ElementRef) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.resizeThrottled$
                .pipe(
                    throttleTime(80),
                    distinctUntilChanged()
                )
                .subscribe(this.calcSize.bind(this))
        );
    }

    public ngAfterViewInit(): void {
        setTimeout(this.calcSize.bind(this));
        this.activeLayer = this.layerImage;
        this.changeActiveLayer.emit(this.layerImage);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });
        this.resizeThrottled$.complete();
    }

    public calcSize(): void {
        this.ratio = this.wrapperElement.nativeElement.offsetHeight / (this.config.getPlainSize().y || 1);
        this.wrapperHeight = this.wrapperElement.nativeElement.offsetHeight;
        this.wrapperWidth = this.wrapperElement.nativeElement.offsetWidth;
    }

    public onIconClick(layerImage: LayerImage): void {
        this.activeLayer.active = false;
        this.activeLayer = layerImage;
        this.activeLayer.active = true;
        this.changeActiveLayer.emit(this.activeLayer);
    }

}
