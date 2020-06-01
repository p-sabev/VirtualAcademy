import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EmittersService {
  public loggedIn: EventEmitter<any> = new EventEmitter();
}
