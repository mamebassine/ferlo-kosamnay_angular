import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRepresentComponent } from './navbar-represent.component';

describe('NavbarRepresentComponent', () => {
  let component: NavbarRepresentComponent;
  let fixture: ComponentFixture<NavbarRepresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarRepresentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarRepresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
