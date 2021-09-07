import { CompanyService, CompanyModel, CompanyTenantModel }
  from '@angular-baobab/rx-client-api';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService, NbAuthResult } from '@nebular/auth';
import { NB_WINDOW, NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { filter, map } from 'rxjs/operators';
import { RouterModule, Router, Routes } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  userMenu = [{ title: 'Log out' }];
  tenantMenu : any;
    public currentTenant: CompanyModel = new CompanyModel;
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private companyService: CompanyService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              @Inject(NB_WINDOW) private window) {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          localStorage.setItem("token", token.getValue());
          this.user = token.getPayload();
        }

      });
  }


  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenuContext'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.headerContextMenuClick(title));
      this.setUserTenants();
      this.setCurrentTenant();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  headerContextMenuClick(title) {
    
      if (title == 'Log out') {
        this.authService.logout("email").subscribe((authResult: NbAuthResult) => {
          if (authResult.isSuccess) {
            this.router.navigate(['/auth/login']);
            localStorage.setItem('companyId', "");
          }
        });
      }

  }

  setUserTenants() {
    this.companyService.companyGetUserCompaniesUI().subscribe(res => {
      console.log("setUserTenants", res);
      this.tenantMenu = res;
      this.menuService.onItemClick()
        .pipe(
          filter(({ tag }) => tag === 'tenantMenuContext'),
          map(({ item: { data } }) => data),
        ).subscribe(data => this.headerTenantContextMenuClick(data));
      
    });
    
  }

  headerTenantContextMenuClick(id) {
    console.log(id);
    localStorage.setItem('companyId', id);
    location.reload();
  }

  setCurrentTenant() {
    var companyId = localStorage.getItem('companyId');
    console.log("setCurrentTenant",companyId);
    if (companyId == null || companyId == "") {
      this.companyService.companyGetUserCompaniesUI().subscribe(res => {
        this.headerTenantContextMenuClick(res[0].companyId);
      });
    }
    this.companyService.companyGet(parseInt(companyId)).subscribe(res => {
      console.log(res);
      this.currentTenant = res;
    });
  }
}
