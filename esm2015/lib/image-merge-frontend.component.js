import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { ConfigService } from './services/config.service';
export class ImageMergeFrontendComponent {
    constructor(config, wrapperElement) {
        this.config = config;
        this.wrapperElement = wrapperElement;
        // Inputs Outputs
        /** Input resize event from parent */
        this.resizeThrottled$ = new Subject();
        /** Moves images to left/center/right with flex properties */
        this.moveTo = 'center';
        /** Emits a change event if this.ratio changes */
        this.ratioChange = new EventEmitter();
        /** Emits height the current image takes at max */
        this.currentMaxHeightChange = new EventEmitter();
        // Subscriptions
        /** Local subscripts to be canceled of destroy */
        this.subscriptions = [];
    }
    ngOnInit() {
        // On Resize trigger this.calcSize
        this.subscriptions.push(this.resizeThrottled$
            .pipe(throttleTime(80), distinctUntilChanged())
            .subscribe(this.getCalSizeCallback().bind(this)));
    }
    ngAfterViewInit() {
        this.getCalSizeCallback()();
    }
    getCalSizeCallback() {
        return () => setTimeout(this.calcSize.bind(this));
    }
    /** Calculates  */
    calcSize(width = 0) {
        // get ration if images (height / width)
        const plainRatio = this.config.getHeightWidthRatio();
        // define max height of images
        const maxHeight = this.maxHeight || this.config.getPlainSize().y;
        // get with of wrapper
        width = width || this.wrapperElement.nativeElement.offsetWidth;
        // calculate height by plain size
        let height = width * plainRatio;
        // if height exceeds max height shrink width if filler element
        if (height > maxHeight) {
            height = maxHeight;
            width = height * (1 / plainRatio);
        }
        // set filler element size
        this.fillerHeight = height;
        this.fillerWidth = width;
        // calculate new ratio for resizing images, so the fit plain
        this.ratio = width / this.config.getPlainSize().x;
        // emit change of ration
        this.ratioChange.emit(this.ratio);
        // emit change of filler height (so parent my adapt)
        this.currentMaxHeightChange.emit(this.fillerHeight);
    }
    ngOnDestroy() {
        // unsubscribe all subscriptions
        this.subscriptions.forEach((subscription) => { subscription.unsubscribe(); });
    }
    getMergeStyle() {
        return {
            height: this.fillerHeight + 'px',
            width: this.fillerWidth + 'px'
        };
    }
}
ImageMergeFrontendComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-image-merge-frontend',
                template: "<ng-container>\n    <div class=\"image-merge-frontend\" [ngStyle]=\"this.getMergeStyle()\" #imageMergeFrontendFiller>\n        <lib-image-layer [layerImage]=\"layerImage\" [ratio]=\"ratio\"></lib-image-layer>\n    </div>\n</ng-container>\n",
                styles: [":host{display:flex;height:100%;justify-content:center;left:0;width:100%}.image-merge-frontend{position:relative;width:100%}"]
            },] }
];
ImageMergeFrontendComponent.ctorParameters = () => [
    { type: ConfigService },
    { type: ElementRef }
];
ImageMergeFrontendComponent.propDecorators = {
    resizeThrottled$: [{ type: Input }],
    layerImage: [{ type: Input }],
    maxHeight: [{ type: Input }],
    moveTo: [{ type: Input }, { type: HostBinding, args: ['style.justify-content',] }],
    ratioChange: [{ type: Output }],
    currentMaxHeightChange: [{ type: Output }],
    fillerElement: [{ type: ViewChild, args: ['imageMergeFrontendFiller',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbWVyZ2UtZnJvbnRlbmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL2ltYWdlLW1lcmdlLWZyb250ZW5kL2ltYWdlLW1lcmdlLWZyb250ZW5kL3Byb2plY3RzL2ltYWdlLW1lcmdlLWZyb250ZW5kL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS1tZXJnZS1mcm9udGVuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUFFLFdBQVcsRUFDekIsS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBT3hELE1BQU0sT0FBTywyQkFBMkI7SUE2Q3BDLFlBQW9CLE1BQXFCLEVBQVUsY0FBMEI7UUFBekQsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFZO1FBeEM3RSxpQkFBaUI7UUFDakIscUNBQXFDO1FBRTdCLHFCQUFnQixHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1FBVTVELDZEQUE2RDtRQUdyRCxXQUFNLEdBQXlDLFFBQVEsQ0FBQztRQUVoRSxpREFBaUQ7UUFFekMsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV2RSxrREFBa0Q7UUFFMUMsMkJBQXNCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEYsZ0JBQWdCO1FBQ2hCLGlEQUFpRDtRQUN6QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFhM0MsQ0FBQztJQUVNLFFBQVE7UUFDWCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ25CLElBQUksQ0FBQyxnQkFBZ0I7YUFDaEIsSUFBSSxDQUNELFlBQVksQ0FBQyxFQUFFLENBQUMsRUFDaEIsb0JBQW9CLEVBQUUsQ0FDekI7YUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZELENBQUM7SUFDTixDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTyxrQkFBa0I7UUFDdEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsUUFBUSxDQUFDLFFBQWdCLENBQUM7UUFDN0Isd0NBQXdDO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNyRCw4QkFBOEI7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqRSxzQkFBc0I7UUFDdEIsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDL0QsaUNBQWlDO1FBQ2pDLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUM7UUFFaEMsOERBQThEO1FBQzlELElBQUksTUFBTSxHQUFHLFNBQVMsRUFBRTtZQUNwQixNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ25CLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDckM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsNERBQTREO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxXQUFXO1FBQ2QsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBMEIsRUFBRSxFQUFFLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVNLGFBQWE7UUFDaEIsT0FBTztZQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSTtTQUNsQyxDQUFDO0lBQ04sQ0FBQzs7O1lBakhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywyUEFBb0Q7O2FBRXZEOzs7WUFOTyxhQUFhO1lBWGpCLFVBQVU7OzsrQkF5QlQsS0FBSzt5QkFJTCxLQUFLO3dCQUlMLEtBQUs7cUJBSUwsS0FBSyxZQUNMLFdBQVcsU0FBQyx1QkFBdUI7MEJBSW5DLE1BQU07cUNBSU4sTUFBTTs0QkFTTixTQUFTLFNBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMYXllckltYWdlfSBmcm9tICcuL21vZGVscy9sYXllci1vYmplY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb25maWdTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaWItaW1hZ2UtbWVyZ2UtZnJvbnRlbmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS1tZXJnZS1mcm9udGVuZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW1hZ2UtbWVyZ2UtZnJvbnRlbmQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZU1lcmdlRnJvbnRlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogUmF0aW8gdG8gbXVsdGlwbHkgaW1hZ2UgYXhpcyB3aXRoICovXG4gICAgcHVibGljIHJhdGlvOiBudW1iZXI7XG5cbiAgICAvLyBJbnB1dHMgT3V0cHV0c1xuICAgIC8qKiBJbnB1dCByZXNpemUgZXZlbnQgZnJvbSBwYXJlbnQgKi9cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgcmVzaXplVGhyb3R0bGVkJDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqIFJvb3QgTGF5ZXIgaW1hZ2UgdG8gYmUgcmFuZGVyZWQgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBsYXllckltYWdlOiBMYXllckltYWdlO1xuXG4gICAgLyoqIE1heGltdW0gaGVpZ2h0IHRoZSBwbGFpbiB0YWtlcyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1heEhlaWdodDogbnVtYmVyO1xuXG4gICAgLyoqIE1vdmVzIGltYWdlcyB0byBsZWZ0L2NlbnRlci9yaWdodCB3aXRoIGZsZXggcHJvcGVydGllcyAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5qdXN0aWZ5LWNvbnRlbnQnKVxuICAgIHByaXZhdGUgbW92ZVRvOiAnZmxleC1zdGFydCcgfCAnZmxleC1lbmQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcblxuICAgIC8qKiBFbWl0cyBhIGNoYW5nZSBldmVudCBpZiB0aGlzLnJhdGlvIGNoYW5nZXMgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwcml2YXRlIHJhdGlvQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIEVtaXRzIGhlaWdodCB0aGUgY3VycmVudCBpbWFnZSB0YWtlcyBhdCBtYXggKi9cbiAgICBAT3V0cHV0KClcbiAgICBwcml2YXRlIGN1cnJlbnRNYXhIZWlnaHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvLyBTdWJzY3JpcHRpb25zXG4gICAgLyoqIExvY2FsIHN1YnNjcmlwdHMgdG8gYmUgY2FuY2VsZWQgb2YgZGVzdHJveSAqL1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIC8vIEVsZW1lbnQgUmVmc1xuICAgIC8qKiBGaWxsZXIgZWxlbWVudCAqL1xuICAgIEBWaWV3Q2hpbGQoJ2ltYWdlTWVyZ2VGcm9udGVuZEZpbGxlcicpXG4gICAgcHVibGljIGZpbGxlckVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogSGVpZ2h0IG9mIGZpbGxlciBlbGVtZW50ICovXG4gICAgcHVibGljIGZpbGxlckhlaWdodDogbnVtYmVyO1xuICAgIC8qKiBXaWR0aCBvZiBmaWxsZXIgZWxlbWVudCAqL1xuICAgIHB1YmxpYyBmaWxsZXJXaWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsIHByaXZhdGUgd3JhcHBlckVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIE9uIFJlc2l6ZSB0cmlnZ2VyIHRoaXMuY2FsY1NpemVcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVRocm90dGxlZCRcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKDgwKSxcbiAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZ2V0Q2FsU2l6ZUNhbGxiYWNrKCkuYmluZCh0aGlzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldENhbFNpemVDYWxsYmFjaygpKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDYWxTaXplQ2FsbGJhY2soKTogKCkgPT4gdm9pZCB7XG4gICAgICAgIHJldHVybiAoKSA9PiBzZXRUaW1lb3V0KHRoaXMuY2FsY1NpemUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIENhbGN1bGF0ZXMgICovXG4gICAgcHVibGljIGNhbGNTaXplKHdpZHRoOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgICAgIC8vIGdldCByYXRpb24gaWYgaW1hZ2VzIChoZWlnaHQgLyB3aWR0aClcbiAgICAgICAgY29uc3QgcGxhaW5SYXRpbyA9IHRoaXMuY29uZmlnLmdldEhlaWdodFdpZHRoUmF0aW8oKTtcbiAgICAgICAgLy8gZGVmaW5lIG1heCBoZWlnaHQgb2YgaW1hZ2VzXG4gICAgICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMubWF4SGVpZ2h0IHx8IHRoaXMuY29uZmlnLmdldFBsYWluU2l6ZSgpLnk7XG5cbiAgICAgICAgLy8gZ2V0IHdpdGggb2Ygd3JhcHBlclxuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IHRoaXMud3JhcHBlckVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgLy8gY2FsY3VsYXRlIGhlaWdodCBieSBwbGFpbiBzaXplXG4gICAgICAgIGxldCBoZWlnaHQgPSB3aWR0aCAqIHBsYWluUmF0aW87XG5cbiAgICAgICAgLy8gaWYgaGVpZ2h0IGV4Y2VlZHMgbWF4IGhlaWdodCBzaHJpbmsgd2lkdGggaWYgZmlsbGVyIGVsZW1lbnRcbiAgICAgICAgaWYgKGhlaWdodCA+IG1heEhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiAoMSAvIHBsYWluUmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IGZpbGxlciBlbGVtZW50IHNpemVcbiAgICAgICAgdGhpcy5maWxsZXJIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZmlsbGVyV2lkdGggPSB3aWR0aDtcbiAgICAgICAgLy8gY2FsY3VsYXRlIG5ldyByYXRpbyBmb3IgcmVzaXppbmcgaW1hZ2VzLCBzbyB0aGUgZml0IHBsYWluXG4gICAgICAgIHRoaXMucmF0aW8gPSB3aWR0aCAvIHRoaXMuY29uZmlnLmdldFBsYWluU2l6ZSgpLng7XG5cbiAgICAgICAgLy8gZW1pdCBjaGFuZ2Ugb2YgcmF0aW9uXG4gICAgICAgIHRoaXMucmF0aW9DaGFuZ2UuZW1pdCh0aGlzLnJhdGlvKTtcbiAgICAgICAgLy8gZW1pdCBjaGFuZ2Ugb2YgZmlsbGVyIGhlaWdodCAoc28gcGFyZW50IG15IGFkYXB0KVxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhIZWlnaHRDaGFuZ2UuZW1pdCh0aGlzLmZpbGxlckhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHsgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNZXJnZVN0eWxlKCk6IG9iamVjdCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZmlsbGVySGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmZpbGxlcldpZHRoICArICdweCdcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=