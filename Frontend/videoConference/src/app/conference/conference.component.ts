import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserInfo } from 'os';
import { Subscription } from 'rxjs';
import { RtcService } from '../services/rtc-service.service';
import { IChatMessage } from '../Interfaces/ichat-message';
import { HubManagingService } from '../services/hub-managing.service';
import { IUserInfo } from '../Interfaces/iuser-info';
import { ISignalInfo } from '../Interfaces/isignal-info';
import { IPeerData } from '../Interfaces/ipeer-data';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../services/discussion.service';
import { IDiscussionInfo } from '../Interfaces/idiscussion-info';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.scss'
})
export class ConferenceComponent implements OnInit, OnDestroy {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  public currentUserId : string;

  public currentUserO : IUserInfo;

  public discussionId : string;

  public currentDiscussion: IDiscussionInfo;

  public subscriptions = new Subscription();

  private stream: any;

  public currentUser: string;

  public dataString: string | null;

  public userVideo: string;

  public messages: Array<IChatMessage>;

  public turnOnCamera = true;

  public turnOnMicrophone = true;

  public mediaError = (): void => { console.error(`Can't get user media`); };

  constructor(private _rtcService: RtcService, 
    private _hubManagingService: HubManagingService,
    private _discussionService: DiscussionService,
    private _acr: ActivatedRoute) { }

  ngOnInit() {
    this._acr.paramMap.subscribe(params => {
      this.currentUserId = params.get("userId") || '';
      this.discussionId = params.get("discussionId") || '';
    });

    if (this.discussionId) {
      this._discussionService.getDiscussion(this.discussionId).subscribe({
        next: discussion => {
          this.currentDiscussion = discussion;         
        },
        error: err => console.log(err)
      }
      );
    }

    if (this.currentUserId) {
      this._rtcService.getCurrentUser().subscribe({
        next: user => {
          this.currentUserO = user;         
        },
        error: err => console.log(err)
      }
      );
    }

    this.messages = new Array();

    this.subscriptions.add(this._hubManagingService.newPeer$.subscribe((user: IUserInfo) => {
      this._rtcService.newUser(user);
      this._hubManagingService.sayHello(this.currentUser, user.connectionId);
    }));

    this.subscriptions.add(this._hubManagingService.helloAnswer$.subscribe((user: IUserInfo) => {
      this._rtcService.newUser(user);
    }));

    this.subscriptions.add(this._hubManagingService.disconnectedPeer$.subscribe((user: IUserInfo) => {
      this._rtcService.disconnectedUser(user);
    }));

    this.subscriptions.add(this._hubManagingService.signal$.subscribe((signalData: ISignalInfo) => {
      this._rtcService.signalPeer(signalData.user, signalData.signal, this.stream);
    }));

    this.subscriptions.add(this._rtcService.onSignalToSend$.subscribe((data: IPeerData) => {
      this._hubManagingService.sendSignalToUser(data.data, data.id);
    }));

    this.subscriptions.add(this._rtcService.onData$.subscribe((data: IPeerData) => {
      this.messages = [...this.messages, { own: false, message: data.data }];
      console.log(`Data from user ${data.id}: ${data.data}`);
    }));

    this.subscriptions.add(this._rtcService.onStream$.subscribe((data: IPeerData) => {
      this.userVideo = data.id;
      this.videoPlayer.nativeElement.srcObject = data.data;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }));
  }


  public onUserSelected(userInfo: IUserInfo) {
    const peer = this._rtcService.createPeer(this.stream, userInfo.connectionId, true);
    debugger;
    this._rtcService.currentPeer = peer;
  }

  public onUserMicrophoneClicked(userInfo: IUserInfo) {
    //בדיקת הדגל של מיקרופון ע"מ לדעת איזו פעולה לבצע, כיבוי או הפעלה
    //וביצוע הפעולה על היוזר שממנו הוטרג האירוע
  }

  public onMuteAllClicked(userInfo: IUserInfo) {
    //כיבוי המיקרופונים של כלל המשתתפים
  }

  public onUserCameraClicked(userInfo: IUserInfo) {
    //בדיקת הדגל של מיקרופון ע"מ לדעת איזו פעולה לבצע, כיבוי או הפעלה
    //וביצוע הפעולה על היוזר שממנו הוטרג האירוע
  }

  public async saveUsername(): Promise<void> {
    try {
      await this._hubManagingService.startConnection(this.currentUser);
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (error) {
      console.error(`Can't join room, error ${error}`);
    }
  }

  public sendMessage() {
    this._rtcService.sendMessage(this.dataString!);
    this.messages = [...this.messages, { own: true, message: this.dataString }];
    this.dataString = null;
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
