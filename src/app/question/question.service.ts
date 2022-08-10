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

    return this.httpClient.post<boolean>("http://localhost:8080/hunt/api/questions/is-accessible", {
      question: question,
      username: username
    })
  }

  getQuestion(questionId: string) {

    return this.httpClient.get<Question>("http://localhost:8080/hunt/api/questions/" + questionId)
  }

  answer(answer: string, id: string, username: string) {

    return this.httpClient.post<boolean>("http://localhost:8080/hunt/api/questions/answer", {
      "answer": answer,
      "id": id,
      "username": username
    })
  }
}
