import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersMasterComponent } from './my-orders-master.component';

describe('MyOrdersMasterComponent', () => {
  let component: MyOrdersMasterComponent;
  let fixture: ComponentFixture<MyOrdersMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOrdersMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
