import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventDashboardComponent } from './new-event-dashboard.component.';

describe('NewEventDashboardComponent', () => {
  let component: NewEventDashboardComponent;
  let fixture: ComponentFixture<NewEventDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
