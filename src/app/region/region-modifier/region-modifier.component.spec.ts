import { ComponentFixture, TestBed } from '@angular/core/testing';

import { regionModifierComponent } from './region-modifier.component';

describe('regionModifierComponent', () => {
  let component: regionModifierComponent;
  let fixture: ComponentFixture<regionModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [regionModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(regionModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
