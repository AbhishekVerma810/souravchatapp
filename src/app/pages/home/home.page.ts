import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  iterations = Array(5).fill(0);
  data:any;
  userInfo:any;
  uid: any;
  constructor(private apiService: ApiService,private router:Router) {

  }
  ngOnInit(): void {
    this.getUserInfo(); 
    this.getCurrentUserInfo(); 
  }
  navigateChatPage(item:any){

    const navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    console.log('helloabhi',navigationExtras)
    this.router.navigate(['/chat-page', { item: JSON.stringify(item) }], navigationExtras);
  }
  async getUserInfo() {
    this.apiService.getAllUserData().then(res=>{
      this.data=res.data;
      console.log('hello abhi',this.data)
    }).catch(err=>{
      console.log('error',err)
    })
   }
  async getCurrentUserInfo(){
    console.log('hello abhi your data here')
    this.apiService.getuserinfo().then(res=>{
      console.log('res.data',res.data)
      
    this.userInfo=res.data;
    }).catch(err=>{
     console.log('error',err)
   })
}
}
