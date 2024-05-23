import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-group-chat-page',
  templateUrl: './group-chat-page.page.html',
  styleUrls: ['./group-chat-page.page.scss'],
})
export class GroupChatPagePage implements OnInit {
  isSender = true;
  text_message: string;
  data: any[] = [];
  newMessage: string = '';
  messages: any[] = [];
  id: string;
  userInfo: any;
  isLoading = false;
  userdata: any;
  formattedMessages: any[] = [];
  private responseSubscription: Subscription;
  ueserID: any;
  showAttachmentMenu: boolean;
  presentingElement = null;
  message: { group_id: any; groupId: any; date: string; message: string; sender: any; senderID: any };
  groupData: any;
  constructor(
    private chatService: SocketIoService,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService

  ) {

    this.responseSubscription = this.chatService.getGroupMessage().subscribe((msg: any) => {
      console.log('hello abhi your message', msg)
      this.formattedMessages.push(msg);
    });
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.has('item')) {
        this.groupData = JSON.parse(params.get('item')!);
        console.log('this.id ====>', this.groupData)
        this.id = this.groupData.group.id;
        console.log('this.id ====>', this.id)
      }
    });
    this.getCurrentUserInfo();
    setTimeout(() => {
                                                                                    const data = this.id;
      this.ueserID = this.userInfo.id;
      this.getMessage(data);
      console.log('groupId',this.id)
      this.chatService.joinGroup(this.id);
    }, 200);
  }
  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
  modeldismiss() {

  }
  async getCurrentUserInfo() {
    try {
      this.userInfo = (await this.apiService.getuserinfo()).data;
    } catch (err) {
      console.log('error', err);
    }
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
  };
  async getMessage(userId) {
    try {
      console.log('data====>', userId)
      const response = await this.apiService.getGroupMessage(userId);
      console.log('response', response)
      this.formattedMessages = response.map(item => ({
        id: item.id,
        message_seen: item.message_seen,
        receiverId: item.reciverID,
        senderID: item.senderId,
        chatId: item.chat.id,
        message: item.chat.message,
        createdAt: new Date(item.chat.createdAt).toLocaleString()
      }));
      console.log('helloneeraj', this.formattedMessages[0].senderId)
    } catch (err) {
      console.log('error', err);
    }
  }

  submitMessage() {
    this.isLoading = true;
    const date = new Date().toLocaleDateString();
    console.log('this.userInfo.idthis.id ', this.id, this.userInfo.id)
    this.message = {
      groupId: this.id,
      date,
      message: this.text_message,
      sender: this.userInfo.id.toString(),
      senderID: this.userInfo.id.toString(),
      group_id: this.id.toString(),

    };
    const data = { date, message: this.text_message };
    this.messages.push(data);
    this.chatService.sendGroupMessage(this.message);
    this.isLoading = false;
    this.text_message = '';
  }
  openAttachmentMenu() {
    this.showAttachmentMenu = true;
  }

  handleAttachment(type: 'video' | 'image' | 'audio' | 'file') {
    switch (type) {
      case 'video':
        this.pickVideo();
        break;
      case 'image':
        this.pickImage();
        break;
      case 'audio':
        this.pickAudio();
        break;
      case 'file':
        this.pickFile();
        break;
    }
  }
  async pickVideo() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    console.log('imageUrl===>', image)
    var imageUrl = image.webPath;
  }
  async pickImage() {

  }
  pickAudio() {

  }
  pickFile() {

  }
}