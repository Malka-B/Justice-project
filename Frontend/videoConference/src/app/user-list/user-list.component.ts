import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RtcService } from '../services/rtc-service.service';
import { IUserInfo } from '../Interfaces/iuser-info';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Output() userSelected: EventEmitter<IUserInfo> = new EventEmitter();

  public users$: Observable<Array<IUserInfo>>;


  constructor(private rtcService: RtcService) { }

  ngOnInit() {
    this.users$ = this.rtcService.users$;
  }

  public userClicked(user: IUserInfo) {
    this.userSelected.emit(user);
  }
}
