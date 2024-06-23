import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerModel } from './models/customer-model';
import { CustomerService } from './services/customer.service';
import { PlaceOrderService } from './services/place-order.service';
import { Observable, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartsServices } from '../cart/cart/services/Carts.services';
import {CartResponse} from './models/cartResponse';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {
  customerForm: any;
  cartProducts:any;
  loading:boolean = false;
  cartId!:Guid;
  total: any = 0; //الكلي في سلة التسوق  total هذا المتغير من اجل حساب ال

  constructor(private formBuilder: FormBuilder,
              private placeOrderService :PlaceOrderService,
              private customerService:CustomerService,
              private toastrService:ToastrService ,
              private cartService: CartsServices) { }

  ngOnInit(): void {

  }
    customerModel = new CustomerModel();

  // createOrder(form: NgForm){
  // this.loading = true;

  //   this.placeOrderService.CreateOrder(form.value).subscribe({
  //     next:() => {
  //      this.loading = false;

  //     },

  //     error: (err) => {
  //       this.loading = false;
  //       alert(err);
  //     }}

  //   );
  // }
  // addCart() {
  //   // هذه الدالة هي لإضافة السلة الى الاي بي آي وهي اخردالة سويناها في الفيديو 12
  //   let OrderItems = this.cartProducts.map((item: any) => {
  //     return { productId:item.item.productId, quantity: item.quantity };
  //   });
  //   let Model = {
  //     OrderItems: OrderItems,
  //   };
  //   this.cartService.createNewCart(Model).subscribe({
  //     next: (res) =>{
  //       // this.success = true
  //       // this.clearCart() // هذه الدالة مشان اذا بدي فضي الكارت بعد ماابعتها يعني بعد مايتم طلبها
  //                        // وقال في اخر الفيديو 12 انو فينا نفضيها اذا بدنا وفينا نخليها لانو في ناس بساووا هيك
  //                        // وفي ناس بساووا هيك
  //     },
  //     error: (err) =>
  //       alert(err)
  //   });
  // }
  // الدالة التالية تقوم بحساب مجمل السعر لكل المنتجات المتواجدة في السلة
  getCartTotal() {
    this.total = 0; // هنا في البداية يتم وضع القيمة البدائية للمتغيير مشان وقت يتم التخزين فيه يكون صفر
    for (let x in this.cartProducts) {
      // هنا قلنا له في الحلقة كلما تم المرور على عنصر احسب سعرو ضرب كميتو وضعه في التوتال
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  // هذه الدالة تحذف كل المنتجات من السلة يعني بتنظف السلة
  clearCart() {
    this.cartProducts = []; // هنا تم  تنظيف السلة يعني حتصير فاضية لانو حطينالها اقواس مصفوفة فاضيين
    this.getCartTotal(); // تم استدعاء السطر هنا مشان عند حذف منتج من السلة يتم حساب التوتال
    // يعني السعر الكلي من جديد
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
    // تحديث السلة بعد تفريغها
  }


  createOrder1(form: NgForm) {
    // Start loading state
    this.loading = true;

      // Retrieve cart products
      this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');

      // Map cart items to order items
      const orderItems = this.cartProducts.map((item: any) => {
        return { productId: item.item.productId, quantity: item.quantity };
      });

  // Prepare model for order creation
  const model = {
    orderItems: orderItems
  };

    // Add the customer
    const customerObservable = this.customerService.addCustomer(form.value);

    // Create the cart
    // يتم ارسال الطلب فارغ لانه فقط سيتم اضافة سلة بدون الاوردر ايتيمس التي في داخلها
    // اما السطر المعلق الذي بعد السطر التالي فهو كان قبل توقيف اضافة الاوردر ايتيمس للسلة عند اضافتها
    // حيث يتم اضافة الاوردر ايتيمس عند اضافة هذه السلة
    const cartObservable = this.cartService.createNewCart() as Observable<CartResponse>;
    // const cartObservable = this.cartService.createNewCart(model) as Observable<CartResponse>;


    // Process the observables concurrently
    forkJoin([customerObservable, cartObservable]).subscribe({
      next: ([customerResponse, cartResponse]) => {
        // Retrieve the newly created customer's ID
        const customerId = customerResponse.customerId;

        // Retrieve the newly created cart's ID
        this.cartId  = cartResponse.cartId;
        console.log(this.cartId);

        // Retrieve cart products
        this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');

        // Map cart items to order items
        const orderItems = this.cartProducts.map((item: any) => {
          return { productId: item.item.productId, quantity: item.quantity, cartId: this.cartId};
        });

        // Prepare model for order creation
        const model1 = {
          customerId: customerId, // Assign the newly created customer's ID
          orderItems: orderItems
        };

        // Create order
        const orderObservable = this.placeOrderService.CreateOrder(model1);

        // Subscribe to the order creation observable
        orderObservable.subscribe({
          next: (orderResponse) => {
            // Handle successful order placement
            this.toastrService.success('Order placed successfully');
            console.log('Order placed successfully:', orderResponse);
            this.loading = false;
            this.clearCart()
          },
          error: (err) => {
            // Handle errors in order creation
            this.loading = false;
            this.toastrService.error(err, '', {
              timeOut: 2000,
              progressBar: true,
            });
          },
        });
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






  // addOrder() {
  //   this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
  //   let OrderItems = this.cartProducts.map((item: any) => {
  //     return { productId:item.item.productId, quantity: item.quantity };
  //   });
  //   let Model = {
  //     OrderItems: OrderItems,
  //   };
  //   this.cartsServices.createNewCart(Model).subscribe({
  //     next: (res) =>{
  //       this.success = true,
  //       this.clearCart() // هذه الدالة مشان اذا بدي فضي الكارت بعد ماابعتها يعني بعد مايتم طلبها
  //                        // وقال في اخر الفيديو 12 انو فينا نفضيها اذا بدنا وفينا نخليها لانو في ناس بساووا هيك
  //                        // وفي ناس بساووا هيك
  //     },
  //     error: (err) =>
  //       alert(err)
  //   });
  // }
}
