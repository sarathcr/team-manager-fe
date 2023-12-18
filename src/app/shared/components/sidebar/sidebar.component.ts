import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import {
  FooterMenuItemConfiguration,
  menuItemConfiguration,
} from '../../models/sidebar-menu.config';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public items: MenuItem[] = menuItemConfiguration;
  public footerMenu: MenuItem[] = FooterMenuItemConfiguration;
}
