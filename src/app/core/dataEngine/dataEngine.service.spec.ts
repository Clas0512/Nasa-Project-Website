/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataEngineService } from './dataEngine.service';

describe('Service: DataEngine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataEngineService]
    });
  });

  it('should ...', inject([DataEngineService], (service: DataEngineService) => {
    expect(service).toBeTruthy();
  }));
});
