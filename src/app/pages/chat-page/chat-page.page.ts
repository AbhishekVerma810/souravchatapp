import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss']
})
export class ChatPagePage implements OnInit, OnDestroy {
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
  message: {file:string,audio:string,images:string, date: string; message: string; sender: any; senderID: any; reciverId: string; };
  imageUrl: string;
  imageForUpload: any;
  file: string;
  audio: string;
  constructor(
    private chatService: SocketIoService,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService

  ) {
    this.responseSubscription = this.chatService.onMessage().subscribe((msg: any) => {
      console.log('msg====>1', msg)
      this.formattedMessages.push(msg);
    });
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.has('item')) {
        this.userdata = JSON.parse(params.get('item')!);
        this.id = this.userdata.id;
      }
    });

    this.getCurrentUserInfo();
    setTimeout(() => {
      const data = { reciverID: this.id, senderId: this.userInfo.id };
      this.ueserID = this.userInfo.id;
      this.getMessage(data);
      this.chatService.joinChat(this.userInfo.id, this.id);
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
   this.imageUrl = image.webPath;
  console.log('imageUrl=>',this.imageUrl)
  };
  selectedAudio(event) {
    const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
  
    //   reader.onload = async () => {
    //     try {
    //       const audioContext = new AudioContext();
    //       const audioBuffer = await audioContext.decodeAudioData(reader.result as ArrayBuffer);
    //       const compressedAudioBuffer = await this.compressAudio(audioContext, audioBuffer);
    //       const compressedAudioBlob = await this.bufferToBlob(compressedAudioBuffer);
    //       const compressedAudioUrl = URL.createObjectURL(compressedAudioBlob);
    //       console.log('Compressed audio URL:', compressedAudioUrl);
    //     } catch (error) {
    //       console.error('Error processing audio:', error);
    //     }
    //   };
  
    //   reader.readAsArrayBuffer(file);
    // }
  }
  
 
  
  
  selectedVideo(event) {
    const file = event.target.files[0];
    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        const aspectRatio = video.videoWidth / video.videoHeight;
        let width = video.videoWidth;
        let height = video.videoHeight;
        if (width > MAX_WIDTH) {
          width = MAX_WIDTH;
          height = width / aspectRatio;
        }
        if (height > MAX_HEIGHT) {
          height = MAX_HEIGHT;
          width = height * aspectRatio;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        this.file = canvas.toDataURL('video/mp4');
        console.log('Resized video URL:', this.file);
     };
      video.src = URL.createObjectURL(file);
    }
  }
  
  
  selectedImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Set the desired maximum width
          const MAX_HEIGHT = 600; // Set the desired maximum height
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          this.imageUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality value (0.0 - 1.0) as needed
          console.log('this.imageUrl=>', this.imageUrl);
        };
      };
    }
  }
  
 async getMessage(data) {
    try {
      const response = await this.apiService.getChatMessage(data);
      this.formattedMessages = response.map(item => ({
        id: item.id,
        message_seen: item.message_seen,
        receiverId: item.reciverID,
        senderID: item.senderId,
        chatId: item.chat.id,
        message: item.chat.message,
        images:item.chat.images,
        file:item.chat.images,
        audio:item.chat.audion,
        createdAt: new Date(item.chat.createdAt).toLocaleString()
      }));
      console.log('helloneeraj', this.formattedMessages)
    } catch (err) {
      console.log('error', err);
    }
  }
  submitMessage() {
    this.isLoading = true;
    const date = new Date().toLocaleDateString();
    console.log('this.userInfo.idthis.id ', this.id, this.userInfo.id)
    this.message = {
      date,
      message: this.text_message,
      sender: this.userInfo.id.toString(),
      senderID: this.userInfo.id.toString(),
      reciverId: this.id.toString(),
      images:this.imageUrl,
      file:this.file,
      audio:this.audio
    };
    const data = { date, message: this.text_message };
    this.messages.push(data);
    this.formattedMessages.push(this.message);
    console.log('this.formattedMessage===>', this.formattedMessages)
    this.chatService.sendMessage(this.message);
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
