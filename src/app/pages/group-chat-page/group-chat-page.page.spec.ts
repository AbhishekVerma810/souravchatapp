import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupChatPagePage } from './group-chat-page.page';

describe('GroupChatPagePage', () => {
  let component: GroupChatPagePage;
  let fixture: ComponentFixture<GroupChatPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
