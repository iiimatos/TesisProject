import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestHomeComponent } from './view-request-home.component';

describe('ViewRequestHomeComponent', () => {
  let component: ViewRequestHomeComponent;
  let fixture: ComponentFixture<ViewRequestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRequestHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
