import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopVerificationComponent } from './pop-verification.component';

describe('PopVerificationComponent', () => {
  let component: PopVerificationComponent;
  let fixture: ComponentFixture<PopVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
