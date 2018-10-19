import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message } from './message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  public serverMessages = new Array<Message>();

  public clientMessage = '';
  public isBroadcasting = false;
  public user = '';

  private _socket: WebSocketSubject<Message>;

  constructor(
    // private message: Message
  ) {


    this._socket = new WebSocketSubject('ws://localhost:8999');
    // tslint:disable-next-line:no-shadowed-variable
    this._socket.subscribe((message) => this. serverMessages.push(message),
    (err) => console.error(err),
    () => console.warn('Completed!'));
  }


  public toggleIsBroadcast(): void {
    this.isBroadcasting = !this.isBroadcasting;
}

public sendMsg() {
    const message = new Message(this.user, this.clientMessage, this.isBroadcasting );
    this.serverMessages.push(message);
    this._socket.next(message);
    this.clientMessage = '';
}


public getSenderInitials(sender: string): string {
  return sender && sender.substring(0, 2).toLocaleUpperCase();
}

}
