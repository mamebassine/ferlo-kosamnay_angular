import { ComponentFixture, TestBed } from '@angular/core/testing';

import { regionAfficherSupprimerComponent } from './region-afficher-supprimer.component';

describe('regionAfficherSupprimerComponent', () => {
  let component: regionAfficherSupprimerComponent;
  let fixture: ComponentFixture<regionAfficherSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [regionAfficherSupprimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(regionAfficherSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
