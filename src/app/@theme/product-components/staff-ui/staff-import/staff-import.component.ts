import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService, StaffModel, Staff } from '@angular-baobab/rx-client-api';
import { Subject, Observable, of, concat } from 'rxjs';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'ngx-staff-import',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './staff-import.component.html',
  styleUrls: ['./staff-import.component.scss']
})
export class StaffImportComponent implements OnInit {
  @Input() facilityId: number;
  private submitPromise: Promise<any>;
  private staffModels =  [];
   private activeFile =  false;  
  constructor(public activeModal: NgbActiveModal,
    public staffService: StaffService) {
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
            self.addstaff(self, item, index);
       });
       self.activeFile = true;
    };
    reader.readAsBinaryString(target.files[0]);
  }
   
    public addstaff(self, item, index){
        if (item[0] == "First Name"){
            return;
        }
        var staff = new StaffModel();
        staff.facilityId = self.facilityId;
        staff.firstName = item[0];
        staff.lastName = item[1];
        if (item[4] == "m"){
            staff.gender= 0;
        }else{
            staff.gender= 1; 
        }
      
        staff.contactNumber = item[3];
        staff.email = item[2];
        staff.dateOfBirth = moment(item[5],'DD/MM/YYYY').toDate();
        console.log(staff);
      
        this.staffModels.push(staff);
    } 

    onSubmit(){
        console.log(JSON.stringify(this.staffModels));
        if (this.staffModels.length < 1)
        {
              swal(
                    'Please select a file with data.',
                    '',
                    'error'
                  )
        }
        this.submitPromise = this.staffService.staffPostImport(this.staffModels).toPromise().then(result => {
            console.log(result);
                if (result)
                 {
                     this.activeModal.close(1);
                    swal(
                          'Staff imported',
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
