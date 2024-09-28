import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAfficherSupprimerComponent } from './produit-afficher-supprimer.component';

describe('ProduitAfficherSupprimerComponent', () => {
  let component: ProduitAfficherSupprimerComponent;
  let fixture: ComponentFixture<ProduitAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
