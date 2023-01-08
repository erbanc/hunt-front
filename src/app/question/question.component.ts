import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../user/user.service";
import {QuestionService} from "./question.service";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { DomSanitizer } from '@angular/platform-browser';


export interface Question {
  id: string,
  name: string,
  html: string,
  text: string,
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionId: string | null = ""

  currentQuestion: Question = {id: "", name: "", html: "", text: "Chargement..."}

  answerForm = this.formBuilder.group({
    answer: '',
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private questionService: QuestionService,
              private toastrService: ToastrService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.questionId = this.route.snapshot.paramMap.get('question')
    this.checkQuestionValidity(this.questionId, this.userService.getUsername())

    this.getCurrentQuestion()
  }

  private checkQuestionValidity(question: string | null, username: string) {

    if (question) {
      this.questionService.isQuestionAccessible(username, question).subscribe((isValid: boolean) => {
        if (!isValid) {
          this.router.navigate(['/404'])
        }
      })
    } else {
      this.router.navigate(['/404'])
    }
  }

  transform(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private getCurrentQuestion() {

    if (this.questionId) {
      this.questionService.getQuestion(this.questionId).subscribe((data: Question) => {
        this.currentQuestion = data
        document.title = data.name
      }, () => this.currentQuestion = {
        id: "",
        name: "",
        html: "",
        text: "Erreur de chargement de la question"
      })
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

  onSubmit(): void {
    const answer = this.answerForm.value.answer;
    const username = this.userService.getUsername();
    if (!!answer) {
      this.questionService.answer(answer, this.currentQuestion.id, username).subscribe((goodAnswer: boolean) => {
        if (goodAnswer) {
          this.toastrService.success("Bravo !")
          this.redirectTo('/questions/' + (this.currentQuestion.id + 1))
        } else {
          this.toastrService.error("Mauvaise réponse :(")
        }
      })
    }
  }
}
