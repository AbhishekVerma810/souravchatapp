import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Peer from 'peerjs';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { VoiceCallService } from 'src/app/services/voice-call-service';

@Component({
  selector: 'app-voice-call-page',
  templateUrl: './voice-call-page.page.html',
  styleUrls: ['./voice-call-page.page.scss'],
})
export class VoiceCallPagePage implements OnInit {
  partnerId: string;
  userdata: any;
  id: any;
  userId:any;
  data: any;
  userData: any;
  constructor(public router:Router,public elRef: ElementRef,private apiService:ApiService,protected activeRoute:ActivatedRoute,private voiceCallService:VoiceCallService) { }
  ngOnInit() {
    



    // this.activeRoute.paramMap.subscribe(params => {
    //   this.getUserInfo();
    //   if (params.has('item')) {
    //     this.userdata = JSON.parse(params.get('item')!);
    //   // this.partnerId = this.userdata.name;
    //   //   console.log('this.id',this.partnerId)
    //   //  this.call();
    //   }
    
    // });
  }
  ngOnDestroy() {
    this.disconnect();
  }

  async getUserInfo() {
    try {
       await this.apiService.getuserinfo().then(res=>{
        this.userId = res.data.name;
        console.log('data==.,',res.data.name)
        this.login();
      })
   
    } catch (err) {
      console.error('Error getting user info:', err);
    }
  }

  // init() {
  //   if (this.myVideo && this.partnerVideo) {
  //     this.videoCallService.init(this.userId, this.myVideo.nativeElement, this.partnerVideo.nativeElement)
  //       .then(() => {
  //         setTimeout(()=>{
  //           this.startCall(this.userId);
  //         },8000)
  
  //       })
  //       .catch((error) => {
  //         console.error('Error initializing PeerCallService:', error);
  //       });
  //   } else {
  //     console.error('myVideo or partnerVideo element not found');
  //   }
  // }

  startCall(partnerId: string) {
    this.voiceCallService.call(partnerId);
  }
  ionViewWillLeave(){
    console.log('when you leave page')
    this.voiceCallService.disconnectCall();
  }
  disconnect() {
      console.log('when you leave page')
      this.voiceCallService.disconnectCall();
      this.router.navigate(['/calling-page'])
  }
  login() {
    this.voiceCallService.init(this.userId);
  }

  call() {
    this.voiceCallService.call(this.partnerId);
  }
  mute(){

  }
  unmute(){

  }

 
}

