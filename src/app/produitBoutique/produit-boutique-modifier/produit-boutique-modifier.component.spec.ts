import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitBoutiqueModifierComponent } from './produit-boutique-modifier.component';

describe('ProduitBoutiqueModifierComponent', () => {
  let component: ProduitBoutiqueModifierComponent;
  let fixture: ComponentFixture<ProduitBoutiqueModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitBoutiqueModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitBoutiqueModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
