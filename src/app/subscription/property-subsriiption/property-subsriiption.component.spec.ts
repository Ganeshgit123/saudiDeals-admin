import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySubsriiptionComponent } from './property-subsriiption.component';

describe('PropertySubsriiptionComponent', () => {
  let component: PropertySubsriiptionComponent;
  let fixture: ComponentFixture<PropertySubsriiptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySubsriiptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySubsriiptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
