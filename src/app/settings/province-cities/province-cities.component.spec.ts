import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceCitiesComponent } from './province-cities.component';

describe('ProvinceCitiesComponent', () => {
  let component: ProvinceCitiesComponent;
  let fixture: ComponentFixture<ProvinceCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
