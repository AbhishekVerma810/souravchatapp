import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.page.html',
  styleUrls: ['./create-group-page.page.scss'],
})
export class CreateGroupPagePage implements OnInit {
  iterations = Array(5).fill(0);
  data:any;
  item: any;
  selectedUsers: any[] = [];
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit() {
    this.getUserInfo();
  }
  async getUserInfo() {
    this.apiService.getAllUserData().then(res=>{
      this.data=res.data;
    }).catch(err=>{
      console.log('error',err)
    })
   }
   navigateChatPage(){
    // this.router.navigate([`/trainer-client-feedback/${this.uid}`]
    const navigationExtras: NavigationExtras = {
      state: {
        item: this.selectedUsers
      }
    };
    console.log('hello abhi',navigationExtras)
    this.router.navigate(['/create-group-name', { item: JSON.stringify( this.selectedUsers) }], navigationExtras);
  }
  toggleUser(user: any, event: any) {
    if (event.detail.checked) {
    
      this.selectedUsers.push(user);
      console.log('this.selectedUsers===>',this.selectedUsers)
    } else {
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    }
  }
}
