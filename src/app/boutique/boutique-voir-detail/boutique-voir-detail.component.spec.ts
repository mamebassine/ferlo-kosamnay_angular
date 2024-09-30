import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueVoirDetailComponent } from './boutique-voir-detail.component';

describe('BoutiqueVoirDetailComponent', () => {
  let component: BoutiqueVoirDetailComponent;
  let fixture: ComponentFixture<BoutiqueVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
