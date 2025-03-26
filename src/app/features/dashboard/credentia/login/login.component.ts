import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login(this.credentials).subscribe(
      (res) => {
        if (res.token) {
          // ✅ حفظ الـ token والـ role في localStorage
          this.authService.saveToken(res.token, res.role);
          alert(`Welcome, ${res.role}!`);

          // ✅ توجيه المستخدم بناءً على الـ role
          if (res.role === 'admin') {
            this.router.navigate(['/admin/home']);
          } else if (res.role === 'teacher') {
            this.router.navigate(['/teacher/home']);
          }
        }
      },
      (err) => {
        alert('Login failed. Check your credentials and try again.');
      }
    );
  }
  // login() {
  //   this.authService.login(this.credentials).subscribe(
  //     (res) => {
  //       alert(`Welcome, ${res.name}!`);
  //       if (res.role === 'admin') {
  //         this.router.navigate(['/admin/home']);
  //       } else if (res.role === 'teacher') {
  //         this.router.navigate(['/teacher/home']);
  //       }
  //     },
  //     (err) => {
  //       alert('Login failed. Check your credentials and try again.');
  //     }
  //   );
  // }
}
