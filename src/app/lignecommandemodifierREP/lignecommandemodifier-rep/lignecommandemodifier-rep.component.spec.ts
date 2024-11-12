import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignecommandemodifierREPComponent } from './lignecommandemodifier-rep.component';

describe('LignecommandemodifierREPComponent', () => {
  let component: LignecommandemodifierREPComponent;
  let fixture: ComponentFixture<LignecommandemodifierREPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignecommandemodifierREPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignecommandemodifierREPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
