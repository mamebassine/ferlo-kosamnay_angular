import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAjouterComponent } from './boutique-ajouter.component';

describe('BoutiqueAjouterComponent', () => {
  let component: BoutiqueAjouterComponent;
  let fixture: ComponentFixture<BoutiqueAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAjouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
