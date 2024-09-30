import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitBoutiqueVoirDetailComponent } from './produit-boutique-voir-detail.component';

describe('ProduitBoutiqueVoirDetailComponent', () => {
  let component: ProduitBoutiqueVoirDetailComponent;
  let fixture: ComponentFixture<ProduitBoutiqueVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitBoutiqueVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitBoutiqueVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
