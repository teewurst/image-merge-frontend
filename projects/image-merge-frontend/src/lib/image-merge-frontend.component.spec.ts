import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMergeFrontendComponent } from './image-merge-frontend.component';

describe('ImageMergeFrontendComponent', () => {
  let component: ImageMergeFrontendComponent;
  let fixture: ComponentFixture<ImageMergeFrontendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMergeFrontendComponent ]
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
