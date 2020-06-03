import {Component, OnInit} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {NotificationsEmitterService} from './_services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _notifications: NotificationsService,
              private notificationEmitter: NotificationsEmitterService) {
  }

  notificationOptions = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: true,
    maxLength: 0,
    animate: 'scale'
  };

  ngOnInit() {
    this.subscribeForMessages();
    this.showNotification('Success', 'Info');
    this._notifications.alert('Test', 'Test');
  }

  subscribeForMessages() {
    this.notificationEmitter.Success.subscribe((msg: string) => {
      this.showNotification(msg, 'Success');
    });

    this.notificationEmitter.Error.subscribe((error: { key: any; message: any; }) => {
      console.log('======>', error);
      if (error.key && error.message) {
        this.showNotificationError(`${error.key}${error.message}`, 'Error');
      } else {
        this.showNotificationError(`${error}`, 'Error');
      }
    });

    this.notificationEmitter.Info.subscribe((msg: string) => {
      this.showNotification(msg, 'Info');
    });
  }

  showNotification(message: string, type: string) {
    console.log('HERE IN SHOW NOTIFICATION');
    this._notifications[type.toLowerCase()](
      type,
      message
    );
  }

  showNotificationError(message: string, type: string) {
    this._notifications['error'](
      type,
      message
    );
  }
}
