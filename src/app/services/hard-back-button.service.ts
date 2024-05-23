import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HardBackButtonService {
  backButton: any;

  constructor(private platform:Platform) { }
  ionViewDidEnter() {
 
    this.backButton = this.platform.backButton.subscribeWithPriority(9999, () => {
    
      });
    }
    ionViewWillLeave() {
      this.backButton.unsubscribe();
    }
}
