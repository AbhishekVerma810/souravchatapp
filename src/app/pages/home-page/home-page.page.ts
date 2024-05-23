import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Device } from '@capacitor/device';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  iterations = Array(5).fill(0);
  data:any;
  userInfo:any;
  constructor(private apiService: ApiService,private router:Router) {

  }
  ngOnInit(): void {
    this.getUserInfo(); 
    this.getCurrentUserInfo(); 
  }
  navigateChatPage(item:any){
    // this.router.navigate([`/trainer-client-feedback/${this.uid}`]
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: item
    //   }
    // };
    // console.log('hello abhi',navigationExtras)
    // this.router.navigate(['/chat-page', { item: JSON.stringify(item) }], navigationExtras);
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
}
