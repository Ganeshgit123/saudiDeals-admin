import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCategoryComponent } from './second-category.component';

describe('SecondCategoryComponent', () => {
  let component: SecondCategoryComponent;
  let fixture: ComponentFixture<SecondCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
