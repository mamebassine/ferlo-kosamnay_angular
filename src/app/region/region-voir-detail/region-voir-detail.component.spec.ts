import { ComponentFixture, TestBed } from '@angular/core/testing';

import { regionVoirDetailComponent } from './region-voir-detail.component';

describe('regionVoirDetailComponent', () => {
  let component: regionVoirDetailComponent;
  let fixture: ComponentFixture<regionVoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [regionVoirDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(regionVoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
