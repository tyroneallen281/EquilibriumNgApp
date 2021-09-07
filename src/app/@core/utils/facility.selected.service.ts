import { Injectable, OnDestroy,  } from '@angular/core';
import { of as observableOf, Observable, Subject,  BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FacilitySelectedService{
  public facilityId: Observable<number>;
  private facilitySubject: BehaviorSubject<number>;

  constructor() {
    this.facilitySubject = new BehaviorSubject<number>(1);
    this.facilityId = this.facilitySubject.asObservable();
    
  }

  changeFacilityId(facilityId) {
      console.log("test"+this.facilitySubject);
      this.facilitySubject.next(facilityId);
  }

}
