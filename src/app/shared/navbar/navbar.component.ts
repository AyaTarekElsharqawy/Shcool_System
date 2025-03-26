import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications: any[] = [];
  hasNewNotifications: boolean = false;
  showNotifications: boolean = false;

  constructor(private http: HttpClient,private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.http.get<any>('assets/Data.json').subscribe(data => {
      this.notifications = data.notifcation;
      this.hasNewNotifications = this.notifications.some(notification => !notification.read);
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.markNotificationsAsRead();
    }
  }

  markNotificationsAsRead() {
    this.notifications.forEach(notification => notification.read = true);
    this.hasNewNotifications = false;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
    // ✅ إشعار بسيط بعد تسجيل الخروج
  Swal.fire({
    icon: 'info',
    title: 'Logged out!',
    text: 'You have successfully logged out.',
    confirmButtonColor: '#007bff',
    timer: 20000 // ✅ الإشعار يختفي تلقائيًا بعد ثانيتين
  });
  }
}
