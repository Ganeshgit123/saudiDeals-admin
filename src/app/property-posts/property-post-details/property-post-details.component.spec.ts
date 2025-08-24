import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPostDetailsComponent } from './property-post-details.component';

describe('PropertyPostDetailsComponent', () => {
  let component: PropertyPostDetailsComponent;
  let fixture: ComponentFixture<PropertyPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyPostDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
