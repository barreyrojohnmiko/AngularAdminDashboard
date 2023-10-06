import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarItemsObject } from 'src/app/objects/interface/SidebarItemsObject';
import { SidebarItemsData } from 'src/app/objects/data/SidebarItemsData';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed: boolean = false;

  constructor(private router: Router) {
    this.isCollapsed = false;
  }

  handleToggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  sidebarItemsData = new SidebarItemsData(this.router);

  get sidebarItems(): SidebarItemsObject[] {
    return this.sidebarItemsData.sidebarItems;
  }
}
