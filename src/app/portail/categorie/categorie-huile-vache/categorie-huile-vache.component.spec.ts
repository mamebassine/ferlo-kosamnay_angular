import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieHuileVacheComponent } from './categorie-huile-vache.component';

describe('CategorieHuileVacheComponent', () => {
  let component: CategorieHuileVacheComponent;
  let fixture: ComponentFixture<CategorieHuileVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieHuileVacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieHuileVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
