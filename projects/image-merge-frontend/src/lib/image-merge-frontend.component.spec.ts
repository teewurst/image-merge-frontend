import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {ImageLayerComponent} from './component/image-layer/image-layer.component';
import {ImageIconComponent} from './component/image-icon/image-icon.component';
import {CommonModule} from '@angular/common';
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from './services/config.service';
import {IconsModule} from './icons/icons.module';
import {layerImageMock} from '../../../demo/src/app/app.mock';

describe('ImageMergeFrontendComponent', () => {
  let component: ImageMergeFrontendComponent;
  let fixture: ComponentFixture<ImageMergeFrontendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMergeFrontendComponent, ImageLayerComponent, ImageIconComponent],
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
  });

  it('should create w/o data', () => {
    expect(component).toBeTruthy();
  });

  it('should create with valid data', () => {
    component.layerImage = layerImageMock;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
