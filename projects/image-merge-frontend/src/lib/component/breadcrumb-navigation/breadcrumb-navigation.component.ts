import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReplaySubject, Subscription} from "rxjs";
import {LayerImage} from "projects/image-merge-frontend/src/lib/models/layer-object.interface";

@Component({
    selector: 'lib-breadcrumb-navigation',
    templateUrl: './breadcrumb-navigation.component.html',
    styleUrls: ['./breadcrumb-navigation.component.less']
})
export class BreadcrumbNavigationComponent implements OnInit, OnDestroy {

    @Input()
    private externalEventEmitter: EventEmitter<LayerImage>;
    @Output()
    private onBreadcrumbClick: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();
    private eventSubscription: Subscription;
    public layerImages: LayerImage[] = [];

    constructor() {
    }

    public handleBreadcrumbIconClick(layerImage: LayerImage): void {
        while (layerImage.id !== this.layerImages[this.layerImages.length - 1].id) {
          this.layerImages.pop();
        }
        this.layerImages.pop();
        this.onBreadcrumbClick.emit(layerImage);
    }

    public ngOnInit(): void {
        this.externalEventEmitter.subscribe((layerImage: LayerImage) => {
            this.layerImages.push(layerImage);
        });
    }

    public ngOnDestroy(): void {
        this.eventSubscription.unsubscribe();
    }

}
