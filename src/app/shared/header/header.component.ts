import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Subject, interval, of } from 'rxjs';
import { Category } from '../../admin/categories/models/category';
import { CategoriesService } from '../../admin/categories/services/categories.service';
import { SelectComponent } from '../select/select.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../accounts/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    SelectComponent,
    MatRadioModule,
    MatButtonModule,MatSelectModule
    ,ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
 quantity: number = 0;
  // total: number=0;
  price: number=0;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  categories: Category[] = [];
  constructor(
    private translate: TranslateService,
    private categoriesService: CategoriesService,
    private router: Router,
    private auth:AuthService,
    private toastrService: ToastrService
  ) {
    translate.addLangs(['en', 'ar']);

  }
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        console.log(res);
      },
      error: (err) => {
        this.toastrService.error(err, '', {
          timeOut: 2000,
          progressBar: true,
        });
      }
    });
  }

  sign_out(){
   this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }


  storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
  o$ = of(
    this.storedItems.forEach((item: any) => {
      this.quantity += item.quantity;
    })
  ).subscribe({
  });


  S = interval(100).subscribe(() => {
    this.storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.quantity = 0;
    this.storedItems.forEach((item: any) => {
      this.quantity += item.quantity;
    });
  });



}
