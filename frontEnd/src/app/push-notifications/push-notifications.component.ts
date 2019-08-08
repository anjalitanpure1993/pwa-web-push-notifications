import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { PushNotificationsService } from './push-notifications.service';
// import { PushNotificationsService } from './push-notifications.service';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {

  // Variables
  readonly VAPID_PUBLIC_KEY = 'BBSQyMN_2WfRK6K-qz-FvihKdQkiIK8OM4p6bzNPIudOkA7uaxGUpKEI5I5zozLLyxbGFIjdSdDzDUZo3jTqYXA';
  public listOfIssues = [
    'Bottle is empty',
    'Hot water issue - hot water is not coming',
    'Leackege in bottle',
    'Bottle bucket overflow',
    'Water is too cold!'
  ];
  public selectedIssue: string;
  public showListOfIssuesList: boolean;

  /**
   * This method is called whn class in instantiated
   * @param swUpdate - instance of SwUpdate
   * @param pnService - instance of PushNotificationsService
   * @param swPush - instance of SwPush
   */
  constructor(private swUpdate: SwUpdate,
              private pnService: PushNotificationsService,
              private swPush: SwPush) { }

  ngOnInit() {
    this.showListOfIssuesList = false;
    this.selectedIssue = this.listOfIssues[0];
  }

  public openIssuesList() {
    this.showListOfIssuesList = true;
  }

  public subscribeToNotifications() {
    console.log(this.swPush);
    if (this.swPush.isEnabled) {
      this.showListOfIssuesList = false;
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        this.pnService.postSubscription(sub, '').subscribe();
      })
      .catch(console.error);
    }
  }

  public getSelectedIssue() {
    this.showListOfIssuesList = false;
    console.log('isse: ', this.selectedIssue);
    console.log('this.swPush.isEnabled:: ', this.swPush.isEnabled);
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        this.pnService.postSubscription(sub, this.selectedIssue).subscribe();
      })
      .catch(console.error);
    }
  }

}
