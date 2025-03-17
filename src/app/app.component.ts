import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent,RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'school-system';
  links: { title: string; path: string; icon: string }[] = [];
  adminLinks = [
    { title: 'الصفحة الرئيسية', path: '/admin/home', icon: 'fa-solid fa-house' },
    { title: 'الفصول', path: '/admin/classes', icon: 'fa-solid fa-book' },
    { title: 'المعلمون', path: '/admin/teacher', icon: 'fa-solid fa-user-tie' },
    { title: 'الطلاب', path: '/admin/students', icon: 'fa-solid fa-graduation-cap' },
    { title: 'الحضور', path: '/admin/attendance', icon: 'fa-regular fa-circle-check' },
    { title: 'الامتحانات', path: '/admin/Exams', icon: 'fa-regular fa-pen-to-square' },
    { title: 'الاشتراكات والأجور', path: '/admin/fees', icon: 'fa-solid fa-sack-dollar' },
    { title: 'التعليمات والشكاوى', path: '/admin/complaints', icon: 'fa-solid fa-message' }
  ];
  teacherLinks = [
    { title: 'الصفحة الرئيسية', path: '/teachers/home', icon: 'fa-solid fa-house' },
    { title: 'الفصول', path: '/teachers/classes', icon: 'fa-solid fa-book' },
    { title: 'المعلمون', path: '/teachers/teachers', icon: 'fa-solid fa-user-tie' },
    { title: 'الطلاب', path: '/teachers/students', icon: 'fa-solid fa-graduation-cap' },
    { title: 'الحضور', path: '/teachers/attendance', icon: 'fa-regular fa-circle-check' },
    { title: 'الامتحانات', path: '/teachers/Exams', icon: 'fa-regular fa-pen-to-square' },
    { title: 'الاشتراكات والأجور', path: '/teachers/fees', icon: 'fa-solid fa-sack-dollar' },
    { title: 'التعليمات والشكاوى', path: '/teachers/complaints', icon: 'fa-solid fa-message' }
  ];
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url.startsWith('/admin')) {
        this.links = this.adminLinks;
      } else if (this.router.url.startsWith('/teachers')) {
        this.links = this.teacherLinks;
      } else {
        this.links = [];
      }
    });
  }
}
