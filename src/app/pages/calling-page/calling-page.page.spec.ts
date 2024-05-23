import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallingPagePage } from './calling-page.page';

describe('CallingPagePage', () => {
  let component: CallingPagePage;
  let fixture: ComponentFixture<CallingPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
