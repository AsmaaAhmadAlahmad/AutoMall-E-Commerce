import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../accounts/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const toastrService = inject(ToastrService);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    return true;
  } else {
     router.navigate(['/home']);
    toastrService.error('Access denied', '', {
      timeOut: 2000,
      progressBar: true,
      });

      return false;
  }
};
