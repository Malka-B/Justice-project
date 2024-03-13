import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDiscussionInfo } from '../Interfaces/idiscussion-info';
import { IUserInfo } from '../Interfaces/iuser-info';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() discussion :IDiscussionInfo; 
  @Input() user :IUserInfo; 
  @Output() diconnectClicked: EventEmitter<IUserInfo> = new EventEmitter();

  getParticipantsList() {
    alert('Participant')
  }

  getDiscussionManager() {
    //should be better on pop-up or visible-div
    alert(`The discussion manger is: ${this.discussion.discussionManager}`)
  }

  getDiscussionDetails() {
    //should be better on pop-up or visible-div
    alert(`The discussion subject is: ${this.discussion.subject}, 
    the manger is: ${this.discussion.discussionManager},
    discussion id: ${this.discussion.discussionId}`)
  }

  configSettings() {
    alert('settings')
  }

  disconnect() {
    alert('disconnect')
  }
}

