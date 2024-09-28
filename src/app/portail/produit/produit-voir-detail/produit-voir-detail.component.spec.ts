import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitVoirDetailComponent } from './produit-voir-detail.component';

describe('ProduitVoirDetailComponent', () => {
  let component: ProduitVoirDetailComponent;
  let fixture: ComponentFixture<ProduitVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
