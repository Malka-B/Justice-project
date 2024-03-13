import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Instance } from 'simple-peer';
import { IPeerData } from '../Interfaces/ipeer-data';
import { IUserInfo } from '../Interfaces/iuser-info';
import { Stream } from 'node:stream';

declare var SimplePeer: any;

@Injectable({
  providedIn: 'root'
})
export class RtcService {

  private users: BehaviorSubject<Array<IUserInfo>>;
  public users$: Observable<Array<IUserInfo>>;

  private onSignalToSend = new Subject<IPeerData>();
  public onSignalToSend$ = this.onSignalToSend.asObservable();

  private onStream = new Subject<IPeerData>();
  public onStream$ = this.onStream.asObservable();

  private onConnect = new Subject<IPeerData>();
  public onConnect$ = this.onConnect.asObservable();

  private onData = new Subject<IPeerData>();
  public onData$ = this.onData.asObservable();

  public currentPeer: Instance;

  constructor() {
    this.users = new BehaviorSubject<IUserInfo[]>([]);
    this.users$ = this.users.asObservable();
  }

  public getCurrentUser(): Observable<IUserInfo> {
    //return the current user     
     return new Observable<IUserInfo>();
  }

  public newUser(user: IUserInfo): void {
    this.users.next([...this.users.getValue(), user]);
  }

  public disconnectedUser(user: IUserInfo): void {
    const filteredUsers = this.users.getValue().filter(x => x.connectionId === user.connectionId);
    this.users.next(filteredUsers);
  }

  public createPeer(stream: Stream, userId: string, initiator: boolean): Instance {
    const peer = new SimplePeer({ initiator, stream });

    debugger;
    peer.on('signal', (data: any) => {
      const stringData = JSON.stringify(data);
      this.onSignalToSend.next({ id: userId, data: stringData });
    });

    peer.on('stream', (data: any) => {
      console.log('on stream', data);
      this.onStream.next({ id: userId, data });
    });

    peer.on('connect', () => {
      this.onConnect.next({ id: userId, data: null });
    });

    peer.on('data', (data: any) => {
      this.onData.next({ id: userId, data });
    });

    return peer;
  }

  public signalPeer(userId: string, signal: string, stream: any) {
    const signalObject = JSON.parse(signal);
    if (this.currentPeer) {
      this.currentPeer.signal(signalObject);
    } else {
      this.currentPeer = this.createPeer(stream, userId, false);
      this.currentPeer.signal(signalObject);
    }
  }

  public sendMessage(message: string) {
    this.currentPeer.send(message);
  }

}
