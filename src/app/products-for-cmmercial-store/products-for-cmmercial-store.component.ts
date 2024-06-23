
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../shared/select/select.component';
import { ProductComponent } from '../shared/product/product.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../products/models/product';
import { ProdutcsService } from '../products/services/products.service';
import { ProductsForCmmercialStoreService } from '../products/services/products-for-cmmercial-store.service';


@Component({
  selector: 'products-for-commercial-store',
  standalone: true,
  imports: [SpinnerComponent, NgIf, SelectComponent, ProductComponent, RouterModule],
  templateUrl: './products-for-cmmercial-store.component.html',
  styleUrl: './products-for-cmmercial-store.component.css',
})

export class ProductsForCmmercialStoreComponent implements OnInit {
  products: Product[] = [];
  Categories: any[] = [];  // التصنيفات هي فقط مصفوفة من السترينغ
  loading: boolean = false;
  cartProducts: any[] = []; //cartProducts صار يعطي خطا لانو ال Product هون لما حطينا النوع
                            // quantity مافيها حقل اسمو  Productوال  quantity فيها
  productsByCommercialStoreId!: Product[];

  constructor(private productService: ProdutcsService,
              private productsForCmmercialStoreService: ProductsForCmmercialStoreService
              , private route: ActivatedRoute
              ,  private toastrService: ToastrService) {}

  ngOnInit(): void {

    // السطر  التالي اللي معلق هوي كان مستخدم قبل مااستخدم فورك جوين
    // this.getAllProducts(); this.getAllCategories();

    // قراءةالبارامتر الذي سيأتي مع الراوت
    let commercialStoreId = this.route.snapshot.queryParamMap.get('commercialStoreId');
    // تحويل القيمة إلى GUID
     var commercialStoreIdAsGuid: Guid = Guid.parse(commercialStoreId!)
     console.log(commercialStoreIdAsGuid)
     this.getProductsByCommercialStoreId(commercialStoreIdAsGuid);
  }


  getProductsByCommercialStoreId(commercialStoreId: Guid) {
    this.loading = true;
    this.productsForCmmercialStoreService.getProductsByCommercialStoreId(commercialStoreId).subscribe(
      {
        next: (res:Product[]) => {
          this.productsByCommercialStoreId = res;
          this.loading = false;
          console.log(res)
        },
        error: (err) => {
          this.loading = false;
          this.toastrService.error(err, '', {
            timeOut: 2000,
            progressBar: true,
          });

        },
      }
    );
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
      // السطر التالي للتأكد اذا كان المنتج الذي نضيفه حاليا موجود حاليا في السلة
      // حيث لايتم اضافته مرة أخرى بل يتم زيادة كميته
      let exist = this.cartProducts.find(item =>
        item.item.productId == event.item.productId
      )

      if(exist) { // هذا في حال كان المنتج موجود سابقا
        alert('المنتج موجود مسبقا في السلة');
      }
      else { // هذا في حال لم يكن المنتج موجود سابقا فسيتم عمل الاجراءات العادية التي هي
             // سيتم اضافة المنتح للمتغير الذي عرفناه سابقا وسيتم وضع هذا
              // لمتغير الذي هو مصفوفة المنتجات في اللوكال ستوريح
        this.cartProducts.push(event) // الاضافة للسلة
        localStorage.setItem('cart', JSON.stringify(this.cartProducts)) // هنا طلبنا أن يتم تخزين الداتا في
      }                                                                 // اللوكال ستوريج على أنها جيسون
    }else { // هنا في حال لم يكن العنصر كارت  موجود في اللوكال ستوريج
              // حيث في هذه الحالة سيتم عمل الاجراءت العادية التي هي اضافة المنتح للمتغير
              // الذي عرفناه سابقا وسيتم وضع هذا
              // لمتغير الذي هو مصفوفة المنتجات في اللوكال ستوريح
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts)) // هنا طلبنا أن يتم تخزين الداتا في
                                                                       // اللوكال ستوريج على أنها جيسون
    }

  }
}
