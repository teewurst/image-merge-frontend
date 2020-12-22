import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ImageMergeFrontendComponent} from './image-merge-frontend.component';
import {ImageLayerComponent} from './component/image-layer/image-layer.component';
import {CommonModule} from '@angular/common';
import {ConfigService, IMAGE_MERGE_FRONTEND_CONFIG_TOKEN} from './services/config.service';
import {IconsModule} from './icons/icons.module';
import {layerImageMock} from '../../../demo/src/app/app.mock';
import {of} from 'rxjs';
import {MockComponent} from 'ng-mocks';

describe('ImageMergeFrontendComponent', () => {
  let component: ImageMergeFrontendComponent;
  let fixture: ComponentFixture<ImageMergeFrontendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMergeFrontendComponent, MockComponent(ImageLayerComponent)],
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

  of(
      {
        // change nothing
        widthOffset: 600,
        expected: {
          ratio: 1,
          fillerHeight: 800
        }
      },
      {
        // ratio is reduced to 0.5
        widthOffset: 300,
        expected: {
          ratio: 0.5,
          fillerHeight: 400
        }
      },
      {
        // Max height overwrites height
        widthOffset: 900,
        expected: {
          ratio: 1,
          fillerHeight: 800
        }
      }
  ).subscribe(
      (data) => it('should set ratio and filler values correctly with width ' + data.widthOffset, () => {
        component.calcSize(data.widthOffset);
        expect(component.ratio).toBe(data.expected.ratio);
        expect(component.fillerHeight).toBe(data.expected.fillerHeight);
      })
  );


});
