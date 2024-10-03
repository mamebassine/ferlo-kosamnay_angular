import { ComponentFixture, TestBed } from '@angular/core/testing';

import { regionAjouterComponent } from './region-ajouter.component';

describe('regionAjouterComponent', () => {
  let component: regionAjouterComponent;
  let fixture: ComponentFixture<regionAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [regionAjouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(regionAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
