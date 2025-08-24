import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorSubsriiptionComponent } from './motor-subsriiption.component';

describe('MotorSubsriiptionComponent', () => {
  let component: MotorSubsriiptionComponent;
  let fixture: ComponentFixture<MotorSubsriiptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorSubsriiptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorSubsriiptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
