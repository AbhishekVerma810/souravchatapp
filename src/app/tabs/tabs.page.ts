import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
   
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
  }
  naviagetCartPage(){
    this.router.navigate(['/apptabs/tabs/my-cart'])
  }
}