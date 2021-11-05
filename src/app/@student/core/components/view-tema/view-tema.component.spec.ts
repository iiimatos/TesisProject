import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTemaComponent } from './view-tema.component';

describe('ViewTemaComponent', () => {
  let component: ViewTemaComponent;
  let fixture: ComponentFixture<ViewTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
