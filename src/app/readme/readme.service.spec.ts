import { TestBed, inject } from '@angular/core/testing';

import { ReadmeService } from './readme.service';

describe('ReadmeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReadmeService,
      ],
    });
  });

  it('should create ReadmeService', inject([ReadmeService], (service: ReadmeService) => {
    expect(service instanceof ReadmeService).toBe(true);
  }));

  describe('ReadmeService#getReadmeHTML', () => {
    it('should return some html', inject([ReadmeService], (service: ReadmeService) => {
      let html = service.getReadmeHTML();
      expect(typeof html).toBe('string');
      expect(html[0]).toBe('<');
    }));
  });

});
