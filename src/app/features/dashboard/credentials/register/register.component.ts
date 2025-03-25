import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
constructor(private authService:AuthService) { }
register() {
  this.authService.signUp(this.user).subscribe(response => {
    console.log('Registration successful:', response);
    alert('Registration successful!');
  }, error => {
    console.error('Registration failed:', error);
    alert('Registration failed!');
  });
}


}
