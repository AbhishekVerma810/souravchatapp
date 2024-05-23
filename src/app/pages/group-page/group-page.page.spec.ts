import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPagePage } from './group-page.page';

describe('GroupPagePage', () => {
  let component: GroupPagePage;
  let fixture: ComponentFixture<GroupPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
