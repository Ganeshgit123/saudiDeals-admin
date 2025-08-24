import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeModelComponent } from './bike-model.component';

describe('BikeModelComponent', () => {
  let component: BikeModelComponent;
  let fixture: ComponentFixture<BikeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
