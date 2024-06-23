import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../accounts/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const toastrService = inject(ToastrService);
   const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    auth.redirectUrl = state.url;
    router.navigate(['/login']);
    toastrService.warning('Please sing in', '', {
      timeOut: 2000,
      progressBar: true,
    });
    return false;
  }
};
