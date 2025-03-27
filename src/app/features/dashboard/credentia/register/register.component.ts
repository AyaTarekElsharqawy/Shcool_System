import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink,RouterModule,CommonModule],
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
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Please check your email to confirm.',
          confirmButtonColor: '#007bff'
        });
        this.router.navigate(['auth/login']);
      },
      (err) => {
        console.error('Registration failed:', err);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please try again.',
          confirmButtonColor: '#d33'
        });
      }
    );
  }

  handleSubmitForm(form:any){
    console.log(form);

  }


}
