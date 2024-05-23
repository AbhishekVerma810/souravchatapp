import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PeerCallService } from 'src/app/services/video-call-s.service';



@Component({
  selector: 'app-video-call-page',
  templateUrl: './video-call-page.page.html',
  styleUrls: ['./video-call-page.page.scss'],
})
export class VideoCallPagePage implements OnInit {
  @ViewChild('myVideo', { static: true }) myVideo: ElementRef<HTMLMediaElement>;
  @ViewChild('partnerVideo', { static: true }) partnerVideo: ElementRef<HTMLMediaElement>;
  topVideoFrame = 'partner-video';
  // userId: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  userdata: any;
  id: any;
  userId:any;
  data: any;
  userData: any;
  constructor(public router:Router,public elRef: ElementRef,private apiService:ApiService,protected activeRoute:ActivatedRoute,private videoCallService:PeerCallService) { }
  ngOnInit() {
    this.myEl = this.elRef.nativeElement.querySelector('#my-video');
    this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');
   
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
      this.userData = await this.apiService.getuserinfo().then(res=>{
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
    this.videoCallService.call(partnerId);
  }
  ionViewWillLeave(){
    console.log('when you leave page')
    this.videoCallService.disconectCall();
  }
  disconnect() {
      this.videoCallService.disconectCall();
      this.router.navigate(['/calling-page'])
  }
  login() {
    this.videoCallService.init(this.userId, this.myEl, this.partnerEl);
  }

  call() {
    this.videoCallService.call(this.partnerId);
    this.swapVideo('my-video');
  }

  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }
}

