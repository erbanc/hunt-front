import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "./question.component";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) {
  }

  isQuestionAccessible(username: string, question: string) {

    return this.httpClient.post<boolean>("https://hunt-back.riri4ever.synology.me/hunt/api/questions/is-accessible", {
      question: question,
      username: username
    })
  }

  getQuestion(questionId: string) {

    return this.httpClient.get<Question>("https://hunt-back.riri4ever.synology.me/hunt/api/questions/" + questionId)
  }

  answer(answer: string, id: string, username: string) {

    return this.httpClient.post<boolean>("https://hunt-back.riri4ever.synology.me/hunt/api/questions/answer", {
      "answer": answer,
      "id": id,
      "username": username
    })
  }
}
