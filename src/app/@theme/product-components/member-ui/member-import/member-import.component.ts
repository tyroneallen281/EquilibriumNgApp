import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService, MemberModel, Member } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'ngx-member-import',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './member-import.component.html',
  styleUrls: ['./member-import.component.scss']
})
export class MemberImportComponent implements OnInit {
  @Input() facilityId: number;
  private submitPromise: Promise<any>;
  private memberModels =  [];
   private activeFile =  false;  
  constructor(public activeModal: NgbActiveModal,
    public memberService: MemberService) {
  }

  ngOnInit() {
   
    
  }

  
   onFileChange(evt: any) {
    var self = this;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      var data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      
       data.forEach(function (item, index) {
            self.addMember(self, item, index);
       });
       self.activeFile = true;
    };
    reader.readAsBinaryString(target.files[0]);
  }
   
  public addMember(self, item, index){
        if (item[0] == "First Name"){
            return;
        }
        var member = new MemberModel();
        member.facilityId = self.facilityId;
        member.firstName = item[0];
        member.lastName = item[1];
        if (item[4] == "m"){
            member.gender= 1;
        }else{
             member.gender= 2; 
        }
      
        member.contactNumber = item[3];
        member.email = item[2];
        member.dateOfBirth = moment(item[5],'DD/MM/YYYY').toDate();
        console.log(member);
      
        this.memberModels.push(member);
    } 

    onSubmit(){
           console.log(JSON.stringify(this.memberModels));
        if (this.memberModels.length < 1)
        {
              swal(
                    'Please select a file with data.',
                    '',
                    'error'
                  )
        }
        this.submitPromise = this.memberService.memberPostImport(this.memberModels).toPromise().then(result => {
            console.log(result);
                if (result)
                 {
                     this.activeModal.close(1);
                    swal(
                          'Members imported',
                          '',
                          'success'
                        )
                }else{
                      swal(
                          'Improt failed',
                          '',
                          'error'
                        )
                }
            
        }, error => {
             swal(
                   'Improt failed - Invalid Data',
                   '',
                   'error'
                 )
        });
    }
}
