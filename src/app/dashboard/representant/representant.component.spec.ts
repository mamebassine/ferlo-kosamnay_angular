import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentantComponent } from './representant.component';

describe('RepresentantComponent', () => {
  let component: RepresentantComponent;
  let fixture: ComponentFixture<RepresentantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
