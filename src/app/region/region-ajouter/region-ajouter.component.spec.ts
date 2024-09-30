import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionAjouterComponent } from './region-ajouter.component';

describe('RegionAjouterComponent', () => {
  let component: RegionAjouterComponent;
  let fixture: ComponentFixture<RegionAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionAjouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
