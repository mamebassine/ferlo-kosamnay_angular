import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservoirdetailcommandeComponent } from './uservoirdetailcommande.component';

describe('UservoirdetailcommandeComponent', () => {
  let component: UservoirdetailcommandeComponent;
  let fixture: ComponentFixture<UservoirdetailcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UservoirdetailcommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UservoirdetailcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
