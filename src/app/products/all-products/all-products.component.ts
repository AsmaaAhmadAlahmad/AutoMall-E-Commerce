import { Component, OnInit,OnChanges } from '@angular/core';
import { ProdutcsService } from '../services/products.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../shared/select/select.component';
import { ProductComponent } from '../../shared/product/product.component';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { HttpResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, observable, of, throwError } from "rxjs";


@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SpinnerComponent, NgIf, SelectComponent, ProductComponent, RouterModule, PaginationComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  Categories: any;  // التصنيفات هي فقط مصفوفة من السترينغ
  loading: boolean = false;
  cartProducts: any[] = []; //cartProducts صار يعطي خطا لانو ال Product هون لما حطينا النوع
                            // quantity مافيها حقل اسمو  Productوال  quantity فيها
  TotalItemCount!:number;
  PageSize:number=5;
  currentPage:number=1;


  constructor(private productService: ProdutcsService,
              private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getAllCategoriesWithAllProducts();

    // السطر  التالي اللي معلق هوي كان مستخدم قبل مااستخدم فورك جوين
    // this.getAllProducts(); this.getAllCategories();
  }


  // pagination هذه الدالة عندما ينقدح حدث تغيير رقم الصفحة من الكومبونينت الابن اللي هوي
  onPageNumberChanged(event:any){

    console.log(event)
    this.productService.getAllProducts(event.pageSize,event.pageIndex+1).subscribe({
      next: (res: HttpResponse<any>) => {
        // قراءة المنتجات من الجسم (body) للاستجابة
        this.products = res.body;

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


  // الدالة التالية تم كتابتها فقط من اجل ان يتم اعادة جلب المنتجات بعد اختيار خيار
  // كل التصنيفات من قائمة التصنيفات التي في الفيو
  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts(this.PageSize,this.currentPage).subscribe({
      next: (res: HttpResponse<any>) => {
        // قراءة المنتجات من الجسم (body) للاستجابة
        this.products = res.body;

          // قراءة معلومات الهيدر X-Pagination
          const xPaginationHeader = res.headers.get('X-Pagination');
          console.log(xPaginationHeader)
          if (xPaginationHeader) {
            const xPagination = JSON.parse(xPaginationHeader);
            this.TotalItemCount = xPagination.TotalItemCount;
            const TotalPageCount = xPagination.TotalPageCount;
            this.PageSize = xPagination.PageSize;
            this. currentPage = xPagination.CurrentPage;
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


  // الدالة  التالية اللي معلقة هيي قبل ما نستخدم فورك جوين
  getAllCategories()
  {
    this.productService.getAllCategories().subscribe({
      next: (res: any) => {
        this.Categories = res;
        console.log(res);
      },
      error: (err) => {
        // Handle errors in adding the customer or creating the cart
        this.loading = false;
        this.toastrService.error(err, '', {
          timeOut: 2000,
          progressBar: true,
        });
      },
    });
  }







  // الدالة التالية تستدعي الدالة التي تدمج ركويست جلب المنتجات مع ركويست جلب التصنيفات
  getAllCategoriesWithAllProducts() {
    this.loading = true;
    this.productService.getAllCategoriesWithAllProducts(this.PageSize,this.currentPage).subscribe({
      next: (res: HttpResponse<any>[]) => {
        this.products = res[0].body;
console.log(res[0].body)
       // قراءة معلومات الهيدر X-Pagination
       const xPaginationHeader = res[0].headers.get('X-Pagination');
       console.log(xPaginationHeader)
       if (xPaginationHeader) {
         const xPagination = JSON.parse(xPaginationHeader);
         this. TotalItemCount = xPagination.TotalItemCount;
         const TotalPageCount = xPagination.TotalPageCount;
         this.PageSize = xPagination.PageSize;
         const currentPage = xPagination.CurrentPage;
      console.log(this.TotalItemCount)
       }
        this.Categories = res[1].body;
        console.log(res);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
         this.toastrService.error(err, '', {
            timeOut: 2000,
            progressBar: true,
          });
      }});

  }


  //  الدالة التالية  لفلترة المنتجات على حسب التصنيف الذي تم اختياره في القائمةالتي في الفيو
  filterCatogery(event: any)
  {
    let value = event.target.value;
     (value == 'all') ? this.getAllProducts() : this.getProductsByCatogery(value);
  }


  // الدالة التالية تستدعي الدالة التي تُفلتر المنتجات بحسب التصنيف
  // وكود الدالة التالية بالتأكيد يمكن وضعه في الدالة السابقة حيث نلاحظ اننا استدعينا
  // هذه الدالة فيها ولكن هكذا الوضع احسن للتنظيم
  getProductsByCatogery(keyword: string)
  {
    this.loading = true;
    this.productService.getProductsByCatogery(keyword).subscribe({
      next: (res: any[]) => {
        this.products = res;
        this.loading = false;
        console.log(res);
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err, '', {
          timeOut: 2000,
          progressBar: true,
        });
      }});
  }

  // الدالة التالية تضيف المنتج للسلة حيث البارامتر الممرر فيها تأتي قيمته من الفيو
  addToCart(event: any)
  {
    console.log(event.item.productId)
    // التأكد ان العنصر كارت موجود في اللوكال ستوريج حيث نحنا بالاصل اللي منضيفو
    if('cart' in localStorage)
    {
      // جلب الكارت من اللوكال ستوريج في حال كان موجود وتخزينه في متغير عرفناه سابقا
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      let exist = this.cartProducts.find(item => item.item.productId == event.item.productId)
      if(exist) { // هذا في حال كان المنتج موجود سابقا
        alert('المنتج موجود مسبقا في السلة');
      }
      else { 
        this.cartProducts.push(event) // الاضافة للسلة
        localStorage.setItem('cart', JSON.stringify(this.cartProducts)) // هنا طلبنا أن يتم تخزين الداتا في
      }                                                                 // اللوكال ستوريج على أنها جيسون
    }else { 
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts)) 
    }
  }
}
