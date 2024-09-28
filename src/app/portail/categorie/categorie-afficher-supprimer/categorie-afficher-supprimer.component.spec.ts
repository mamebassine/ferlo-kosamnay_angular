import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAfficherSupprimerComponent } from './categorie-afficher-supprimer.component';

describe('CategorieAfficherSupprimerComponent', () => {
  let component: CategorieAfficherSupprimerComponent;
  let fixture: ComponentFixture<CategorieAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
