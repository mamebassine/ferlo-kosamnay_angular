import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAfficherSupprimerComponent } from './boutique-afficher-supprimer.component';

describe('BoutiqueAfficherSupprimerComponent', () => {
  let component: BoutiqueAfficherSupprimerComponent;
  let fixture: ComponentFixture<BoutiqueAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
