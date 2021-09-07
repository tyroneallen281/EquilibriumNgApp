import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';

@Component({
    selector: 'ngx-pages',
    template: `
<ngx-system-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
</ngx-system-layout>
  `,
})
export class PagesComponent {
    public menu: NbMenuItem[];
    MENU_ITEMS: NbMenuItem[] = [
        {
            title: 'Dashboard',
            icon: 'fas fa-home',
            link: '/pages/dashboard',
            home: true,
            data: {
                permission: 'view',
                resource: 'dashboard'
            },
        },
        {
            title: 'Members',
            icon: 'fas fa-users',
            link: '/pages/member/member-table',
            children: [
                {
                    title: "All Members",
                    url: '#/pages/member/member-table'
                },
                {
                    title: "Package Members",
                    url: '#/pages/member/member-table?haspackage=true'
                },
                {
                    title: "Casual Members",
                    url: '#/pages/member/member-table?haspackage=false'
                }
            ],
            data: {
                permission: 'view',
                resource: 'reports'
            }
        },
        {
            title: 'Schedule',
            icon: 'fas fa-calendar',
            link: '/pages/schedule/schedule-table',
            children: [
                {
                    title: "Calendar",
                    url: '#/pages/schedule/calendar'
                },  {
                    title: "Manage Schedule",
                    url: '#/pages/schedule/class-table'
                }
            ],
            data: {
                permission: 'view',
                resource: 'reports'
            }
        },
        {
            title: 'Staff',
            icon: 'fas fa-briefcase',
            link: '/pages/staff/staff-table',
            children: [
                {
                    title: "Manage Staff",
                    url: '#/pages/staff/staff-table'
                }
            ],
            data: {
                permission: 'view',
                resource: 'reports'
            }
        },
        {
            title: 'Settings',
            icon: 'fas fa-cogs',
            link: '/pages/reports/reports-table',
            children: [
                 {
                    title: "Emails",
                    url: '#/pages/email/email-table'
                },
                {
                    title: "Packages",
                    url: '#/pages/package/package-table'
                }, {
                    title: "Facility",
                    url: '#/pages/facility/facility-table'
                }, {
                    title: "Statements",
                    url: '#/pages/facility/statement-table'
                }, {
                    title: "Help",
                    url: '#/pages/manage/help'
                }
            ],
            data: {
                permission: 'view',
                resource: 'reports'
            }
        }
    ];

constructor(private accessChecker: NbAccessChecker) {
  
  }

  ngOnInit() {
      this.menu = this.MENU_ITEMS;
   
  }
  
}
