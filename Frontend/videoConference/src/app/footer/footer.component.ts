import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { IUserInfo } from '../Interfaces/iuser-info';
import { Observable } from 'rxjs';
import { RtcService } from '../services/rtc-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() currentUser: IUserInfo;
  @Output() userCameraClicked: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() userMicrophoneClicked: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() muteAllClicked: EventEmitter<IUserInfo> = new EventEmitter();

  


  constructor() { }

  ngOnInit() {

  }

  share(){
    alert('share')
  }

  muteAll(){
    //emit event of muteAllClicked  with data of current user
  }

  microphone(){
    //emit event of userMicrophoneClicked with data of current user
  }

  camera(){
   //emit event of userCameraClicked with data of current user
  }
}
