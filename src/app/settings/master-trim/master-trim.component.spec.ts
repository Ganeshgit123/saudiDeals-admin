import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTrimComponent } from './master-trim.component';

describe('MasterTrimComponent', () => {
  let component: MasterTrimComponent;
  let fixture: ComponentFixture<MasterTrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTrimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
