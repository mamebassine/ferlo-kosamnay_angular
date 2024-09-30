import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommandeAjouterComponent } from './ligne-commande-ajouter.component';

describe('LigneCommandeAjouterComponent', () => {
  let component: LigneCommandeAjouterComponent;
  let fixture: ComponentFixture<LigneCommandeAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommandeAjouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneCommandeAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
