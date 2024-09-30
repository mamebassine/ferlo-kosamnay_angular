import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitBoutiqueAjouterComponent } from './produit-boutique-ajouter.component';

describe('ProduitBoutiqueAjouterComponent', () => {
  let component: ProduitBoutiqueAjouterComponent;
  let fixture: ComponentFixture<ProduitBoutiqueAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitBoutiqueAjouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitBoutiqueAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
