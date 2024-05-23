import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData:any;
  constructor(private router:Router,private apiService:ApiService) {}

 ngOnInit(): void {
  this.getCurrentUserInfo();
 }
  
  logout() {
    this.router.navigate(['/login'])
  }
  async getCurrentUserInfo() {
    try {
        this.apiService.getuserinfo().then(res=>{
          this.userData=res.data;
          console.log('your data')
        })
    } catch (err) {
      console.log('error', err);
    }
  }
}
