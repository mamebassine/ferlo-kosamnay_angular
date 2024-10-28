import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentantDashboardComponent } from './representant-dashboard.component';

describe('RepresentantDashboardComponent', () => {
  let component: RepresentantDashboardComponent;
  let fixture: ComponentFixture<RepresentantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentantDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
