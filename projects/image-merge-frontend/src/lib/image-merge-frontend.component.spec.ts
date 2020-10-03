import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {ImageLayerComponent} from "./component/image-layer/image-layer.component";
import {ImageIconComponent} from "./component/image-icon/image-icon.component";
import {BreadcrumbNavigationComponent} from "./component/breadcrumb-navigation/breadcrumb-navigation.component";
import {CommonModule} from "@angular/common";
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from "./services/config.service";
import {IconsModule} from './icons/icons.module';

describe('ImageMergeFrontendComponent', () => {
  let component: ImageMergeFrontendComponent;
  let fixture: ComponentFixture<ImageMergeFrontendComponent>;

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
    fixture = TestBed.createComponent(ImageMergeFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
