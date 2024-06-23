import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterInfo } from './register-info';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:true,
  imports:[SpinnerComponent,
    NgIf,
    RouterModule,CommonModule,FormsModule]
})
export class RegisterComponent implements OnInit{
  name:string = ''
  email:string = ''
  password:string = ''
  confirmPassword:string = ''
  isSubmitting:boolean = false
  validationErrors:any = []
  loading:boolean = false;


  constructor(private authService: AuthService,
              private router: Router,
             private toastrService: ToastrService) {}

  ngOnInit(): void {


  }
   registerInfo = new RegisterInfo();

  registerAction(form:NgForm) {
    this.loading = true;



    console.log(form)
    this.isSubmitting = true;
    this.authService.register(form.value).subscribe({

      next:(value:any) => {
     this.loading = false;
     this.toastrService.success('Registration successful!', '', {
      timeOut: 10000,
      progressBar: true,
    });
     this.router.navigate(['/login']);

      },
      error:(err:any) => {
        this.loading = false;
        this.toastrService.error(err, '', {
          timeOut: 10000,
          progressBar: true,
        });
      },
    })

  }
}
