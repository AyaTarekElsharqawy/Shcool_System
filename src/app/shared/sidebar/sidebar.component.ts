import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;
  @Input() links: { title: string; path: string; icon: string }[] = [];
   toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}