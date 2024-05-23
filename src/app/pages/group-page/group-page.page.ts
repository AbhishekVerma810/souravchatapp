import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.page.html',
  styleUrls: ['./group-page.page.scss'],
})

export class GroupPagePage implements OnInit {
  iterations = Array(5).fill(0);
  data = '8'
  groups: any = [];
  userInfo: any;
  id: string = ''
  constructor(private apiService: ApiService, private router: Router) {
    console.log('hello abhi how are your code here and where are yiui waiting you brother')
  }
  ngOnInit() {
    this.getCurrentUserInfo();
    this.getGroup()
  }
  getGroup() {
    this.id = this.userInfo.id;
    console.log('id==>', this.id)
    this.apiService.getGroups(this.id).then(res => {
      console.log('hello abhi===>', res)
      this.groups = res;
    }).catch(err => {
      console.log('err====>', err)
    })
  }
  async getCurrentUserInfo() {
    this.apiService.getuserinfo().then(res => {
      this.userInfo = res.data;
      this.getGroup()
    }).catch(err => {
      console.log('error', err)
    })
  }
  navigateGroupChat(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    console.log('hello abhi', navigationExtras)
    this.router.navigate(['/group-chat-page', { item: JSON.stringify(item) }], navigationExtras);
  }
}
