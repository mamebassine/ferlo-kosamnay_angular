import { TestBed } from '@angular/core/testing';

import { ProduitBoutiqueService } from './produit-boutique.service';

describe('ProduitBoutiqueService', () => {
  let service: ProduitBoutiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitBoutiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
