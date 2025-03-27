import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
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
    password: '',
    phone: '',
    role: 'teacher',
    isConfirmed: false,
    walletBalance: 0
  };

  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  phonePattern = /^[0-9]{11}$/;

  constructor(private authService: AuthService, private router: Router) {}

  signUp(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to show validation messages
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    console.log('Sending user data:', this.user);
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
          text: err.error?.message || 'Please try again.',
          confirmButtonColor: '#d33'
        });
      }
    );

  // handleSubmitForm(form:any){
  //   console.log(form);

  }
// }


}
