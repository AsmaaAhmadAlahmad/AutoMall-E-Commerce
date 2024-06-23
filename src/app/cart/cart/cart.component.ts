import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsServices } from './services/Carts.services';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SharedService } from '../../shared/test';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  total: any = 0; //الكلي في سلة التسوق  total هذا المتغير من اجل حساب ال
  cartProducts: any = [];
  success: boolean = false;
  IsCartHasElement:boolean = true;
  constructor(private cartsServices: CartsServices ) {
    this.CartIsHasElement()
  }
  ngOnInit(): void {
    this.getCartProducts();
    this.getCartTotal()
  }

  // الدالة التالية تجلب سلة المنتجات
  getCartProducts() {
    if ('cart' in localStorage) {
      // جلب الكارت من اللوكال ستوريج في حال كان موجود وتخزينه في متغير عرفناه سابقا
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    }
  }

  // الدالة التالية تقوم بحساب مجمل السعر لكل المنتجات المتواجدة في السلة
  getCartTotal() {
    this.total = 0; // هنا في البداية يتم وضع القيمة البدائية للمتغيير مشان وقت يتم التخزين فيه يكون صفر
    for (let x in this.cartProducts) {
      // هنا قلنا له في الحلقة كلما تم المرور على عنصر احسب سعرو ضرب كميتو وضعه في التوتال
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  // الدالة التالية تتنفذ عندما يتم الضغط على زر تنقيص كمية المنتج في السلة حيث تم استدعائها في الفيو
  minAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal(); // هنا تم استدعاء الدالة مرة اخرى ليتم حساب التوتال النهائي بعد تغير الكمية لمنتج ما
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); //all-products.component.ts هذا السطر تم شرحه سابقا في
    // وقد تم وضعه مرة أخرى هنا حتى يتم تعديل
    // الكوانتيتي للمنتج في السلة

  }

  // الدالة التالية تتنفذ عندما يتم الضغط على زر زيادة كمية المنتج في السلة حيث تم استدعائها في الفيو
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); //all-products.component.ts هذا السطر تم شرحه سابقا في
    // إخطار الخدمة بتحديث البيانات
  } // وقد تم وضعه مرة أخرى هنا حتى يتم تعديل
  // الكوانتيتي للمنتج في السلة

  detectChange() {
    // اكتشاف التغييرات التي تحدث في الانبوت الذي تم استدعاء هذه الدالة به
    this.getCartTotal(); // هنا تم استدعاء الدالة مرة اخرى ليتم حساب التوتال النهائي بعد تغير الكمية لمنتج ما
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
    // تعديل الكمية للمنتج في السلة عند حدوث
    // تغيير في الانبوت من الانبوت نفسه يعني
    // من السهم تبع الانبوت نفسو
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal(); // تم استدعاء السطر هنا مشان عند حذف منتج من السلة يتم حساب التوتال
                         // يعني السعر الكلي من جديد
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
    // ان يتم تحديث السلة بعد حدف المنتج منها
    this.CartIsHasElement()
  }

  clearCart() {
    // هذه الدالة تحذف كل المنتجات من السلة يعني بتنظف السلة
    this.cartProducts = []; // هنا تم  تنظيف السلة يعني حتصير فاضية لانو حطينالها اقواس مصفوفة فاضيين
    this.getCartTotal(); // تم استدعاء السطر هنا مشان عند حذف منتج من السلة يتم حساب التوتال
                         // يعني السعر الكلي من جديد
    this.IsCartHasElement = false;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
    // تحديث السلة بعد تفريغها
  }

  // دالة للتأكد بأن سلة التسوق تحتوي على عناصر
  CartIsHasElement() {
    if ('cart' in localStorage) {
      // جلب الكارت من اللوكال ستوريج في حال كان موجود وتخزينه في متغير عرفناه سابقا
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      if(this.cartProducts.length>0)
         this.IsCartHasElement = true;
      else
      this.IsCartHasElement = false;
    console.log(this.IsCartHasElement)
    }
    else
    this.IsCartHasElement = false
  }




  // addCart() {
  //   // هذه الدالة هي لإضافة السلة الى الاي بي آي وهي اخردالة سويناها في الفيديو 12
  //   let OrderItems = this.cartProducts.map((item: any) => {
  //     return { productId:item.item.productId, quantity: item.quantity };
  //   });
  //   let Model = {
  //     OrderItems: OrderItems,
  //   };
  //   this.cartsServices.createNewCart(Model).subscribe({
  //     next: (res) =>{
  //       this.success = true
  //       // this.clearCart() // هذه الدالة مشان اذا بدي فضي الكارت بعد ماابعتها يعني بعد مايتم طلبها
  //                        // وقال في اخر الفيديو 12 انو فينا نفضيها اذا بدنا وفينا نخليها لانو في ناس بساووا هيك
  //                        // وفي ناس بساووا هيك
  //     },
  //     error: (err) =>
  //       alert(err)
  //   });
  // }
}
