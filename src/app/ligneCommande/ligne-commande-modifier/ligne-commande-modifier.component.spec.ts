import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommandeModifierComponent } from './ligne-commande-modifier.component';

describe('LigneCommandeModifierComponent', () => {
  let component: LigneCommandeModifierComponent;
  let fixture: ComponentFixture<LigneCommandeModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommandeModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneCommandeModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
