import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageLayerComponent} from './image-layer.component';
import {ImageMergeFrontendComponent} from "../../image-merge-frontend.component";
import {ImageIconComponent} from "../image-icon/image-icon.component";
import {BreadcrumbNavigationComponent} from "../breadcrumb-navigation/breadcrumb-navigation.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from "../../services/config.service";

describe('ImageLayerComponent', () => {
  let component: ImageLayerComponent;
  let fixture: ComponentFixture<ImageLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent, BreadcrumbNavigationComponent],
      imports: [
        CommonModule,
        FontAwesomeModule
      ],
      providers: [
        ConfigService,
        {provide: IMAGE_MERGE_FRONTEND_CONFIG_TOKEN, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
