import { Component } from '@angular/core';
import Peer from 'peerjs';
declare var window:any;
import { Location } from "@angular/common";
import { Platform } from '@ionic/angular';
import {Router } from '@angular/router';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  constructor( public platform: Platform,private router:Router,private apiService:ApiService) {
    this.fcmData();
    const user_data = localStorage.getItem('user_data');
   if(user_data){
    console.log('helo abhi homme')
      this.router.navigate(['/apptabs/tabs/home'])
   }else{
    console.log('helo abhi login')
      this.router.navigate(['/login']);
   }

  }
  async fcmData() {
    console.log('hellllllabhifcmData');
    const wasPermissionGiven: boolean = await window?.FCM?.requestPushPermission({
      ios9Support: {
        timeout: 10,  
        interval: 0.3
      }
    });
      console.log('getToken');
      window.FCM.getToken().then((token:any) => {
      console.log('helllloooooabhi',token);
      }).catch((err:any)=>{
       console.log('getToken ', err);
      });
      const listener = (data:any) => {
      console.log('data ', data);
      console.log('data ', data.detail);
      if(data.detail.wasTapped){
        console.log('Received in background');
        let sendData={
          id: data.detail.contact_id,
          user_id:'',
          type:'contact'
        }
        this.router.navigate(['/messages'], { queryParams: sendData });
      }else{
        console.log('Received in foreground');
       
      }
     }
    window.FCM.eventTarget.addEventListener("notification", listener, false);
     window.FCM.hasPermission().then((hasPermission:any) => {
       console.log("Has permission!!");
       if (hasPermission) {
         console.log("Has permission!");
         console.log(hasPermission);
        }
     })
  }
}
