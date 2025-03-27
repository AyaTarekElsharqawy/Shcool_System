import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterLink],
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
          Swal.fire({
            icon: 'success',
            title: `Welcome, ${res.name}!`,
            text: 'You have successfully logged in.',
            confirmButtonColor: '#007bff'
          });

          // ✅ توجيه المستخدم بناءً على الـ role
          if (res.role === 'admin') {
            this.router.navigate(['/admin/home']);
          } else if (res.role === 'teacher') {
            this.router.navigate(['/teacher/home']);
          }
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Check your confirmation email and try again.',
          confirmButtonColor: '#d33'
        });
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
