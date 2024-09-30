import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionAfficherSupprimerComponent } from './region-afficher-supprimer.component';

describe('RegionAfficherSupprimerComponent', () => {
  let component: RegionAfficherSupprimerComponent;
  let fixture: ComponentFixture<RegionAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
