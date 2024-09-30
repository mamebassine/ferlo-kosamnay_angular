import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitBoutiqueAfficherSupprimerComponent } from './produit-boutique-afficher-supprimer.component';

describe('ProduitBoutiqueAfficherSupprimerComponent', () => {
  let component: ProduitBoutiqueAfficherSupprimerComponent;
  let fixture: ComponentFixture<ProduitBoutiqueAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitBoutiqueAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitBoutiqueAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
