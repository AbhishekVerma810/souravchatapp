import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calling-page',
  templateUrl: './calling-page.page.html',
  styleUrls: ['./calling-page.page.scss'],
})
export class CallingPagePage implements OnInit {
  data:any;
  userInfo:any;
  constructor(private apiService: ApiService,private router:Router) {
   }
  ngOnInit() {
    this.getUserInfo();
    this.getCurrentUserInfo();
  }
  async getUserInfo() {
    this.apiService.getAllUserData().then(res=>{
      this.data=res.data;
    }).catch(err=>{
      console.log('error',err)
    })
   }
  async getCurrentUserInfo(){
    this.apiService.getuserinfo().then(res=>{
      console.log('res.data',res.data)
    this.userInfo=res.data;
    }).catch(err=>{
     console.log('error',err)
   })
}
navigateVoiceCAllPage(item:any){
  // this.router.navigate([`/trainer-client-feedback/${this.uid}`]
  // const navigationExtras: NavigationExtras = {
  //   state: {
  //     item: item
  //   }
  // };
  // console.log('hello abhi',navigationExtras)
  // this.router.navigate(['/voice-call-page', { item: JSON.stringify(item) }], navigationExtras);
}
navigateVideoCallPage(item:any){
  // this.router.navigate([`/trainer-client-feedback/${this.uid}`]
  const navigationExtras: NavigationExtras = {
    state: {
      item: item
    }
  };
  console.log('hello abhi',navigationExtras)
  this.router.navigate(['/video-call-page', { item: JSON.stringify(item) }], navigationExtras);
}
}
