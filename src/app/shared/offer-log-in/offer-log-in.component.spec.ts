import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLogInComponent } from './offer-log-in.component';

describe('OfferLogInComponent', () => {
  let component: OfferLogInComponent;
  let fixture: ComponentFixture<OfferLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferLogInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
