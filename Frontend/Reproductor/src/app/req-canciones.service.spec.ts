import { TestBed } from '@angular/core/testing';

import { ReqCancionesService } from './req-canciones.service';

describe('ReqCancionesService', () => {
  let service: ReqCancionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqCancionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
