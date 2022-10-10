/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FocusModeComponent } from './focusMode.component';

describe('FocusModeComponent', () => {
  let component: FocusModeComponent;
  let fixture: ComponentFixture<FocusModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
