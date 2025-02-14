import { Injectable } from '@angular/core';
import {FeedbackRequest} from '../models/feedback-request';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  saveFeedback(feedbackRequest: FeedbackRequest) {
    return this.http.post(`http://localhost:8080/api/feedback`, feedbackRequest);
  }
}
