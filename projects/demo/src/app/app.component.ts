import {Component, HostListener, OnInit} from '@angular/core';
import {LayerImage} from '../../../image-merge-frontend/src/lib/models/layer-object.interface';
import {layerImageMock} from './app.mock';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    title = 'demo';

    fullWidth = false;
    public layerImage: LayerImage;

    public resetLayerImage: string;
    public height: number = 800;
    private toggleHeights: number[] = [900, 700];
    public side: string = 'center';
    private toggleSides: string[] = ['flex-end', 'flex-start'];
    public resize$: Subject<any> = new Subject<any>();
    public maxHeight: number;

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        this.resize$.next(event);
    }

    public ngOnInit(): void {
        this.layerImage = layerImageMock;
        this.resetLayerImage = JSON.stringify(this.layerImage);
        setTimeout(() => this.resize$.next(1234));
    }

    public triggerResize(): void {
        this.fullWidth = !this.fullWidth;
        this.resize$.next(this.height * Math.random());
    }

    public toggleHeight(height): void {
        this.toggleHeights.push(height);
        this.height = this.toggleHeights.shift();
        this.resize$.next(this.height);
    }

    public toggleSide(side): void {
        this.toggleSides.push(side);
        this.side = this.toggleSides.shift();
        this.resize$.next(this.height);
    }
}
