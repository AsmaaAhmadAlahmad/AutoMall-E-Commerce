import { Component, OnInit, OnChanges } from '@angular/core';

import { NgIf } from '@angular/common';
import { SelectComponent } from '../shared/select/select.component';
import { ProductComponent } from '../shared/product/product.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Category } from '../admin/categories/models/category';
import { CategoriesService } from '../admin/categories/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommercialStoresService } from './serivce/commercial-stores.service';
import { Guid } from 'guid-typescript';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-commercial-stores',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    SelectComponent,
    ProductComponent,
    RouterModule,
    PaginationComponent
  ],
  styleUrl: './commercial-stores-for-category.component.css',
  templateUrl: './commercial-stores-for-categorycomponent.html',
})
export class commercialStoresForCategoryComponent implements OnInit{
  categories: Category[] = [];
  loading!: boolean;
  commercialStoresByCategory: any[] = [];
  TotalItemCount!:number;
  PageSize:number=5;
  currentPage:number=1;
  categoryIdAsGuid!:Guid

  constructor(
    private translate: TranslateService,
    private CommercialStoreServices: CommercialStoresService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {
    console.log('hi');
  }
  ngOnInit(): void {

    // تم التسمع على تغير الاي دي في الراوت مشان عند تغير الاي دي يتم استدعاء دالة
    // جلب المحال التجارية على اساس الاي دي اللي هوي اي دي الصنف
    this.route.queryParams.subscribe((params: Params) => {
      let categoryId = params['categoryId'];
      if (categoryId) {
        this.categoryIdAsGuid = Guid.parse(categoryId);
        this.getCommersialStoresByCategory(this.categoryIdAsGuid,this.PageSize, this.currentPage);
        console.log(categoryId);
        console.log('hi');
      }
    });
  }


   // pagination هذه الدالة عندما ينقدح حدث تغيير رقم الصفحة من الكومبونينت الابن اللي هوي
   onPageNumberChanged(event:any){

    console.log(event)
    this.CommercialStoreServices.getCommercialStoreByCategory(this.categoryIdAsGuid,event.pageSize,event.pageIndex+1).subscribe({
      next: (res: HttpResponse<any>) => {
        // قراءة المنتجات من الجسم (body) للاستجابة
        this.commercialStoresByCategory = res.body;

          // قراءة معلومات الهيدر X-Pagination
          const xPaginationHeader = res.headers.get('X-Pagination');
          console.log(xPaginationHeader)
          if (xPaginationHeader) {
            const xPagination = JSON.parse(xPaginationHeader);
            this.TotalItemCount = xPagination.TotalItemCount;
            const TotalPageCount = xPagination.TotalPageCount;
            this.PageSize = xPagination.PageSize;
            this.currentPage = xPagination.CurrentPage;
         console.log(this.TotalItemCount)
          }
        // قم بمعالجة البيانات أو إجراء الإجراءات المناسبة هنا

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err);
      }
    });
  }


  getCommersialStoresByCategory(categoryId:Guid, pageSize:number, currentPage:number) {
    this.loading = true;
    this.CommercialStoreServices.getCommercialStoreByCategory(categoryId, pageSize, currentPage).subscribe({
      next: (res: HttpResponse<any>) => {
        // قراءة المنتجات من الجسم (body) للاستجابة
        this.commercialStoresByCategory = res.body;

          // قراءة معلومات الهيدر X-Pagination
          const xPaginationHeader = res.headers.get('X-Pagination');
          console.log(xPaginationHeader)
          if (xPaginationHeader) {
            const xPagination = JSON.parse(xPaginationHeader);
            this.TotalItemCount = xPagination.TotalItemCount;
            const TotalPageCount = xPagination.TotalPageCount;
            this.PageSize = xPagination.PageSize;
            const currentPage = xPagination.CurrentPage;
         console.log(this.TotalItemCount)
          }
        // قم بمعالجة البيانات أو إجراء الإجراءات المناسبة هنا

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err);
      }
    });
  }




}
