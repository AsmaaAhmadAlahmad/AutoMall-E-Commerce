import { Component } from '@angular/core';
import { LoginInfo } from './login-info';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth:AuthService,
              private toastrService:ToastrService,
              private router: Router){}
  loginInfo: LoginInfo = new LoginInfo();
  loading:boolean = false;

  loginAction(form: NgForm)
  {

    console.log(form);
    this.loginInfo = form.value;
    this.auth.login(this.loginInfo).subscribe({
      next:(res) => {
        localStorage.setItem('token',res.value);
        if(this.auth.redirectUrl){
          this.router.navigate([this.auth.redirectUrl]);
          this.auth.redirectUrl = null; // Reset redirectUrl after using it
        }
        console.log(this.auth.redirectUrl)
        this.toastrService.success('Login successful');
      console.log(res)
      },
      error: (err) => {
        // Handle errors in adding the customer or creating the cart
        this.loading = false;
        this.toastrService.error(err, '', {
          timeOut: 2000,
          progressBar: true,
        });
      },
    })
  }
}
