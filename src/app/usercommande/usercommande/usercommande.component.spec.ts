import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommandeComponent } from './usercommande.component';

describe('UsercommandeComponent', () => {
  let component: UsercommandeComponent;
  let fixture: ComponentFixture<UsercommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsercommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsercommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
