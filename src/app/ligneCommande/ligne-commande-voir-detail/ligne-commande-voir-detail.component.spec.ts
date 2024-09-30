import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommandeVoirDetailComponent } from './ligne-commande-voir-detail.component';

describe('LigneCommandeVoirDetailComponent', () => {
  let component: LigneCommandeVoirDetailComponent;
  let fixture: ComponentFixture<LigneCommandeVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommandeVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneCommandeVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
