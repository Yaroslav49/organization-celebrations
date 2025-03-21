import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMasterComponent } from './card-master.component';

describe('CardMasterComponent', () => {
  let component: CardMasterComponent;
  let fixture: ComponentFixture<CardMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
