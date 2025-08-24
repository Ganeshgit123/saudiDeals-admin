import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPostDetailsComponent } from './motor-post-details.component';

describe('MotorPostDetailsComponent', () => {
  let component: MotorPostDetailsComponent;
  let fixture: ComponentFixture<MotorPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorPostDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
