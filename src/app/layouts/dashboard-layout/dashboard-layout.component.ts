import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { StoreService } from '../../core/services/store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, SpinnerComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  get loading$(): Observable<boolean> {
    return this.storeService.selectIsLoading();
  }

  constructor(private storeService: StoreService) {}
}
