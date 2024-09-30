import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionModifierComponent } from './region-modifier.component';

describe('RegionModifierComponent', () => {
  let component: RegionModifierComponent;
  let fixture: ComponentFixture<RegionModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
