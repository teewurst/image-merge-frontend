import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ImageLayerComponent} from './image-layer.component';
import {ImageMergeFrontendComponent} from '../../image-merge-frontend.component';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from '../../services/config.service';

describe('ImageLayerComponent', () => {
  let component: ImageLayerComponent;
  let fixture: ComponentFixture<ImageLayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMergeFrontendComponent, ImageLayerComponent],
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
