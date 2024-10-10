import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieLaitCailleComponent } from './categorie-lait-caille.component';

describe('CategorieLaitCailleComponent', () => {
  let component: CategorieLaitCailleComponent;
  let fixture: ComponentFixture<CategorieLaitCailleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieLaitCailleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieLaitCailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
