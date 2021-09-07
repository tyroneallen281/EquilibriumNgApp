import { Component,Renderer } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-systemuser-stats',
  templateUrl: './systemuser-stats.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SystemUsersStatsComponent {
  dashData = [
    {
      title: 'John Doe',
      formData: [{
        title: 'Day/Night Visits',
        value: 1,
        activeProgress: 40,
        description: 'Relativlty Completed (12%)',
      },
      {
        title: 'Security Report',
        value: 4,
        activeProgress: 60,
        description: 'Relativlty Completed (30%)',
      },
      {
        title: 'Meeting Minutes',
        value: 3,
        activeProgress: 55,
        description: 'Relativlty Completed (55%)',
        }],
      actions: [ {
          link: '/pages/customers/customers-stats',
          title: 'Customers'
        }]
    }
    , {
      title: 'Micheal Test',
      formData: [{
        title: 'Day/Night Visits',
        value: 2,
        activeProgress: 30,
        description: 'Relativlty Completed (12%)',
      },
      {
        title: 'Security Report',
        value: 3,
        activeProgress: 30,
        description: 'Relativlty Completed (30%)',
      },
      {
        title: 'Meeting Minutes',
        value: 3,
        activeProgress: 30,
        description: 'Relativlty Completed (55%)',
      }],
      actions: [ {
        link: '/pages/customers/customers-stats',
        title: 'Customers'
      }]
    }];
 
  constructor(http: HttpClient,
    renderer: Renderer) {
  }

 
}
