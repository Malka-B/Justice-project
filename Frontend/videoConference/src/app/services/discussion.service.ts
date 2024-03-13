import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { IDiscussionInfo } from '../Interfaces/idiscussion-info';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http: HttpClient) { }

  getDiscussion(discussionId: string): Observable<IDiscussionInfo> {
    return this.http.get<IDiscussionInfo>(`${environment.getAccountRoute}${discussionId}`);
  }
}
