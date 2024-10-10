import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieFromageComponent } from './categorie-fromage.component';

describe('CategorieFromageComponent', () => {
  let component: CategorieFromageComponent;
  let fixture: ComponentFixture<CategorieFromageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieFromageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieFromageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
