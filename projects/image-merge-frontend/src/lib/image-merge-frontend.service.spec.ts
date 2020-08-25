import { TestBed } from '@angular/core/testing';

import { ImageMergeFrontendService } from './image-merge-frontend.service';

describe('ImageMergeFrontendService', () => {
  let service: ImageMergeFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageMergeFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
