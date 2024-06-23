import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminAllProductsComponent } from './admin/products/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewProductComponent } from './admin/products/new-product/new-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { NewCommercialStoreComponent } from './admin/commercial-stores/new-commercial-store.component';
import { commercialStoresForCategoryComponent } from './all-commercial-stores/commercial-stores-for-category.component';
import { ProductsForCmmercialStoreComponent } from './products-for-cmmercial-store/products-for-cmmercial-store.component';
import { RegisterComponent } from './accounts/register/register.component';
import { LoginComponent } from './accounts/login/login.component';
import { AboutTheMallComponent } from './about-the-mall/about-the-mall.component';
import { authGuard } from './shared/Guards/auth.guard';
import { adminGuardGuard } from './shared/Guards/admin-guard.guard';

export const routes: Routes = [
  {
    path: 'commercial-stores-for-category',
    component: commercialStoresForCategoryComponent,
  },

  { path: 'products', component: AllProductsComponent },

  { path: 'details', component: ProductsDetailsComponent },

  { path: 'about-the-mall', component: AboutTheMallComponent },



  { path: 'cart', component: CartComponent },

  {
    path: 'place-order',
    component: PlaceOrderComponent,
    canActivate: [authGuard],
  },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'products-for-cmmercial-store',
    component: ProductsForCmmercialStoreComponent,
  },

  { path: 'home', component: HomeComponent },

  {
    path: 'admin',
    loadComponent: () =>
      import('../app/admin/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [authGuard,adminGuardGuard],
  },

  {
    path: 'admin/categories',
    loadComponent: () =>
      import('../app/admin/categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
    canActivate: [authGuard,adminGuardGuard],
  },

  {
    path: 'admin/users',
    loadComponent: () =>
      import('../app/admin/users/users.component').then(
        (c) => c.UsersComponent
      ),
    canActivate: [authGuard,adminGuardGuard],
  },


  {
    path: 'admin/products/all-products',
    loadComponent: () =>
      import('../app/admin/products/all-products/all-products.component').then(
        (c) => c.AdminAllProductsComponent
      ),
    canActivate: [authGuard,adminGuardGuard],
  },

  {
    path: 'admin/products/new-product',
    loadComponent: () =>
      import('../app/admin/products/new-product/new-product.component').then(
        (c) => c.NewProductComponent
      ),
    canActivate: [authGuard,adminGuardGuard],
  },

  {
    path: 'admin/new-commercial-store',
    component: NewCommercialStoreComponent,
    canActivate: [authGuard,adminGuardGuard],
  },

  { path: ' ', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
