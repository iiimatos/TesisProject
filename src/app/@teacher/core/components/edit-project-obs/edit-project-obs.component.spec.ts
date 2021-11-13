import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectObsComponent } from './edit-project-obs.component';

describe('EditProjectObsComponent', () => {
  let component: EditProjectObsComponent;
  let fixture: ComponentFixture<EditProjectObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectObsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
