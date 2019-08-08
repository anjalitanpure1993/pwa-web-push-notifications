import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  public notificationURL = 'https://github.com/anjalitanpure1993/anjalitanpure1993.github.io/subscribe';

  constructor(private http: HttpClient) { }

  postSubscription(sub: PushSubscription, selectedIssue) {
    const req = {
      sub: sub,
      data: selectedIssue
    };
    console.log('sub: ', sub);
    return this.http.post(this.notificationURL, req);
  }
}
