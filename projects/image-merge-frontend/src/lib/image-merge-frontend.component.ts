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
    private resizeThrottled$: Subject<any> = new Subject<any>();
    @Input()
    public layerImage: LayerImage;

    // Subscriptions
    private subscriptions: Subscription[] = [];

    // Element Refs
    @ViewChild('imageMergeFrontendFiller')
    public fillerElement: ElementRef;

    public fillerHeight: number;
    public fillerWidth: number;

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
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });
        this.resizeThrottled$.complete();
    }

    public calcSize(): void {
        setTimeout(() => {
            const wrapperRatio = this.wrapperElement.nativeElement.offsetHeight / this.wrapperElement.nativeElement.offsetWidth;
            const plainRatio = this.config.getHeightWidthRatio();

            // if the ratio of the wrapper element sides
            if (plainRatio <= wrapperRatio) {
                // select height as base for ratio
                this.fillerWidth = this.wrapperElement.nativeElement.offsetWidth;
                this.ratio = this.wrapperElement.nativeElement.offsetWidth / this.config.getPlainSize().x;
                this.fillerHeight = this.wrapperElement.nativeElement.offsetWidth * plainRatio;
            } else {
                // select width as base for ratio
                this.fillerHeight = this.wrapperElement.nativeElement.offsetHeight;
                this.ratio = this.wrapperElement.nativeElement.offsetHeight / this.config.getPlainSize().y;
                this.fillerWidth = this.wrapperElement.nativeElement.offsetHeight * (1 / plainRatio);
            }
        });
    }

    public getMergeStyle(): object {
        return {
            height: this.fillerHeight + 'px',
            width: this.fillerWidth  + 'px'
        };
    }
}
