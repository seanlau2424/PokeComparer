import { TestBed } from '@angular/core/testing';

import { DataCrawlerService } from './data-crawler.service';

describe('DataCrawlerService', () => {
  let service: DataCrawlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCrawlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
