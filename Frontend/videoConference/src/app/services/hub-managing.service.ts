import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from "@aspnet/signalr";
//import * as signalR from "@microsoft/signalr";
import { ISignalInfo } from '../Interfaces/isignal-info';
import { IUserInfo } from '../Interfaces/iuser-info';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HubManagingService {

  private hubConnection: signalR.HubConnection;

  private newPeer = new Subject<IUserInfo>();
  public newPeer$ = this.newPeer.asObservable();

  private helloAnswer = new Subject<IUserInfo>();
  public helloAnswer$ = this.helloAnswer.asObservable();

  private disconnectedPeer = new Subject<IUserInfo>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();

  private signal = new Subject<ISignalInfo>();
  public signal$ = this.signal.asObservable();
  constructor() { }

  public async startConnection(currentUser: string): Promise<void> {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signarR)
      .build();

    await this.hubConnection.start();
    console.log('Connection started');

    this.hubConnection.on('NewUserArrived', (data) => {
      this.newPeer.next(JSON.parse(data));
    });

    this.hubConnection.on('UserSaidHello', (data) => {
      this.helloAnswer.next(JSON.parse(data));
    });

    this.hubConnection.on('UserDisconnect', (data) => {
      this.disconnectedPeer.next(JSON.parse(data));
    });

    this.hubConnection.on('SendSignal', (user, signal) => {
      this.signal.next({ user, signal });
    });

    this.hubConnection.invoke('NewUser', currentUser);
  }

  public sendSignalToUser(signal: string, user: string) {
    this.hubConnection.invoke('SendSignal', signal, user);
  }
  
  public sayHello(userName: string, user: string): void {
    this.hubConnection.invoke('HelloUser', userName, user);
  }
}
