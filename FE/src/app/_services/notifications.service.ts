import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NotificationsEmitterService {
  public Success: EventEmitter<any> = new EventEmitter();
  public Error: EventEmitter<any> = new EventEmitter();
  public ErrorDebounce: EventEmitter<any> = new EventEmitter();
  public InfoDebounce: EventEmitter<any> = new EventEmitter();
  public Info: EventEmitter<any> = new EventEmitter();
}
