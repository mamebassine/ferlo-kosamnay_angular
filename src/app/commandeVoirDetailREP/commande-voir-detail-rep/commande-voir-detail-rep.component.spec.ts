import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeVoirDetailREPComponent } from './commande-voir-detail-rep.component';

describe('CommandeVoirDetailREPComponent', () => {
  let component: CommandeVoirDetailREPComponent;
  let fixture: ComponentFixture<CommandeVoirDetailREPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeVoirDetailREPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeVoirDetailREPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
