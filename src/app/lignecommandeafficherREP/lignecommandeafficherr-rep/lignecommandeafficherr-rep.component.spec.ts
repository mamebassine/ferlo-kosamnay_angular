import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignecommandeafficherrREPComponent } from './lignecommandeafficherr-rep.component';

describe('LignecommandeafficherrREPComponent', () => {
  let component: LignecommandeafficherrREPComponent;
  let fixture: ComponentFixture<LignecommandeafficherrREPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignecommandeafficherrREPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignecommandeafficherrREPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
