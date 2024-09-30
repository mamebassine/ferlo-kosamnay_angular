import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionVoirDetailComponent } from './region-voir-detail.component';

describe('RegionVoirDetailComponent', () => {
  let component: RegionVoirDetailComponent;
  let fixture: ComponentFixture<RegionVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
