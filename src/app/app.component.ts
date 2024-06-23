import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NgModel } from '@angular/forms';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AuthService } from './accounts/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,HomeComponent,CommonModule,FooterComponent,AdminHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  showSlider:boolean = true;
  constructor(private auth:AuthService,
             private router:Router){
    // translate.addLangs(['en', 'ar']);
    // translate.setDefaultLang('ar');
   }

  ngOnInit(): void {
    // this.translate.onLangChange.subscribe((lang) => console.log(lang))
  }
  title = 'test';
  
  isAdminSection(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
