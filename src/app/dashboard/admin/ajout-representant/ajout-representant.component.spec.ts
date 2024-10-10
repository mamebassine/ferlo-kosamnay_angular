import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRepresentantComponent } from './ajout-representant.component';

describe('AjoutRepresentantComponent', () => {
  let component: AjoutRepresentantComponent;
  let fixture: ComponentFixture<AjoutRepresentantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutRepresentantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutRepresentantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
