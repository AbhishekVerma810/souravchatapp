import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-group-name',
  templateUrl: './create-group-name.page.html',
  styleUrls: ['./create-group-name.page.scss'],
})
export class CreateGroupNamePage implements OnInit {
  iterations = Array(5).fill(0);
  userdata: any = [];
  selectedUsers: any = [];
  groupName:any;
  id: any;
  userInfo: any;
  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.getCurrentUserInfo();
    this.activeRoute.paramMap.subscribe(params => {
      const itemParam = params.get('item');
      if (itemParam) {
        try {
          this.userdata = JSON.parse(itemParam);
          console.log('this user dataaaa', this.selectedUsers);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });
  }
getCurrentUserInfo() {
    this.apiService.getuserinfo().then(res => {
      console.log('res.data', res.data);
      this.userInfo = res.data; 
      
      this.userdata.push(this.userInfo);
      console.log('group member data',this.userdata)
    }).catch(err => {
      console.log('error', err);
    });
  }
createGroup() {
    console.log('hello abhi how are you',this.userInfo.id)
    const data={
      groupName:this.groupName,
      creatorId:this.userInfo.id,
      userId:this.userdata
    }
    this.apiService.createGroup(data).then(res => {
      console.log('heloo abhi how are you',res)
      this.router.navigate(['apptabs/tabs/group-page'])
    }).catch(err => {
      console.log('errr=>', err)
    })
   }
}
