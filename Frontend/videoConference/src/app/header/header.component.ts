import { Component, Input } from '@angular/core';
import { IDiscussionInfo } from '../Interfaces/idiscussion-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() discussion :IDiscussionInfo; 
}
