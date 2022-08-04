import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameFeedbackComponent } from './username-feedback.component';

describe('UsernameFeedbackComponent', () => {
  let component: UsernameFeedbackComponent;
  let fixture: ComponentFixture<UsernameFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
