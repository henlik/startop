import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranSingleComponent } from './tran-single.component';

describe('TranSingleComponent', () => {
  let component: TranSingleComponent;
  let fixture: ComponentFixture<TranSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
