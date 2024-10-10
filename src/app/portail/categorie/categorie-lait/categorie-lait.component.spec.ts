import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieLaitComponent } from './categorie-lait.component';

describe('CategorieLaitComponent', () => {
  let component: CategorieLaitComponent;
  let fixture: ComponentFixture<CategorieLaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieLaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
