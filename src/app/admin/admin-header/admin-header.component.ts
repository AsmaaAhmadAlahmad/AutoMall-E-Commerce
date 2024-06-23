import { Component } from '@angular/core';
import { AuthService } from '../../accounts/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
  }
}

