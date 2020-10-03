import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageIconComponent} from './image-icon.component';
import {ImageMergeFrontendComponent} from "../../image-merge-frontend.component";
import {ImageLayerComponent} from "../image-layer/image-layer.component";
import {BreadcrumbNavigationComponent} from "../breadcrumb-navigation/breadcrumb-navigation.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from "../../services/config.service";
import {IconsModule} from '../../icons/icons.module';

describe('ImageIconComponent', () => {
  let component: ImageIconComponent;
  let fixture: ComponentFixture<ImageIconComponent>;

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
    fixture = TestBed.createComponent(ImageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
