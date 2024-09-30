import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommandeAfficherSupprimerComponent } from './ligne-commande-afficher-supprimer.component';

describe('LigneCommandeAfficherSupprimerComponent', () => {
  let component: LigneCommandeAfficherSupprimerComponent;
  let fixture: ComponentFixture<LigneCommandeAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommandeAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneCommandeAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
