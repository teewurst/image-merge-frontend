import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreadcrumbNavigationComponent} from './breadcrumb-navigation.component';
import {ImageMergeFrontendComponent} from "../../image-merge-frontend.component";
import {ImageLayerComponent} from "../image-layer/image-layer.component";
import {ImageIconComponent} from "../image-icon/image-icon.component";
import {CommonModule} from "@angular/common";
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from "../../services/config.service";
import {IconsModule} from '../../icons/icons.module';

describe('BreadcrumbNavigationComponent', () => {
    let component: BreadcrumbNavigationComponent;
    let fixture: ComponentFixture<BreadcrumbNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent, BreadcrumbNavigationComponent],
            imports: [
                CommonModule,
                IconsModule
            ],
            providers: [
                ConfigService,
                {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: {}}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
