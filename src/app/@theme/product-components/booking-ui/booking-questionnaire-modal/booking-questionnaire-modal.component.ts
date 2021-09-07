import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassBookingService, ClassBookingQuestionniareModel } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-booking-questionnaire-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './booking-questionnaire-modal.component.html',
  styleUrls: ['./booking-questionnaire-modal.component.scss']
})
export class BookingQuestionnaireModalComponent implements OnInit {
  @Input() id: number;
  submitPromise: Promise<any>;
  private questionModel: ClassBookingQuestionniareModel = new ClassBookingQuestionniareModel;
  private questionnaire = {};
  private title = "Booking Questionnaire";
 
  constructor(public activeModal: NgbActiveModal,
    public classBookingService: ClassBookingService) {
  }

  ngOnInit() {
   
      if (this.id != null) {
           this.classBookingService.classBookingGet(this.id).subscribe(res => {
              console.log(res);
               if (res.questionnaire != null){
                    this.questionnaire = JSON.parse(res.questionnaire);
                }
              
          });
      } 
  }

  
    onSubmit() {
        
        this.questionModel.classBookingId = this.id;
         this.questionModel.questionnaire = JSON.stringify(this.questionnaire);
        console.log( this.questionModel);
        this.submitPromise = this.classBookingService.classBookingPutQuestionnaireClassBooking( this.questionModel).toPromise().then(result => {
                this.validateQuestions();
                 this.activeModal.close(1);
            }, error => console.log(error));
  }
 
   validateQuestions(){
        if (this.questionnaire['q1'] > 38 || 
            this.questionnaire['q2'] == 1 || 
            this.questionnaire['q3'] == 1 ||
            this.questionnaire['q4'] == 1 ||
            this.questionnaire['q5'] == 1 ||
            this.questionnaire['q6'] == 1 ||
            this.questionnaire['q7'] == 1){
                 swal(
                     'COVID Questionnaire warning',
                     'Answers indicate a high risk.',
                     'warning'
                     );
        }else{
                swal(
                     'COVID Questionnaire',
                     'Answers indicate a low risk.',
                     'success'
                     );
        }
    }
}
