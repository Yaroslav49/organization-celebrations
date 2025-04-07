import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersClientComponent } from './my-orders-client.component';

describe('MyOrdersClientComponent', () => {
  let component: MyOrdersClientComponent;
  let fixture: ComponentFixture<MyOrdersClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOrdersClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
