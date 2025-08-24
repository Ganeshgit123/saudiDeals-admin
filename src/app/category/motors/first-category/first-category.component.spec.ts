import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCategoryComponent } from './first-category.component';

describe('FirstCategoryComponent', () => {
  let component: FirstCategoryComponent;
  let fixture: ComponentFixture<FirstCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
