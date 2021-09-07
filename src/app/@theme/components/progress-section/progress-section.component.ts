import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {
  @Input() dataobject: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    
  }

  openLink(itemAction) {
    this.router.navigate([itemAction.link], { queryParams: { id: itemAction.id } });
  }
}
