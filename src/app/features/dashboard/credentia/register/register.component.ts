import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''

  };

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    console.log('Sending user data:', this.user); // للتحقق من القيم قبل الإرسال
    this.authService.signUp(this.user).subscribe(
      (res) => {
        alert('Registration successful! Please check your email to confirm.');
        this.router.navigate(['auth/login']);
      },
      (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Try again.');
      }
    );
  }



}
