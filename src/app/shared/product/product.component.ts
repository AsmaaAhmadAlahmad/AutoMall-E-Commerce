import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../products/models/product';
import { convertToSpacesPipe } from '../convert-to-spaces.pipe';
import { HttpUrlEncodingCodec } from '@angular/common/http';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,convertToSpacesPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
 @Input() data!:Product ; // هذا دخل سيتم جلبه من الاب الذي يتم استدعاء هذا المكون فيه
 @Output() item = new EventEmitter(); // هذا سنرسله للأب
 addButton: boolean = false; // هذا المتغير لازم في الفيو حيث يؤدي لاختفاء عنصر وظهور عنصر
 amount: number = 0;  // هذا المتغير مشان كمية المنتج الذي سيتم اضافته للسلة
 // تعريف المتغيرات للقيم الدنيا والقصوى
minValue: number = 1;
maxValue: number = 10;
disableButton: boolean = true;
codec = new HttpUrlEncodingCodec;

ngEncode(param: string){
  return this.codec.encodeValue(param);
}

jsEncode(param: string){
  return encodeURIComponent(param);
}

ngDecode(param: string){
  return this.codec.decodeValue(this.ngEncode(param));
}

jsDecode(param: string){
  console.log(this.jsEncode(param))
  return decodeURIComponent(this.jsEncode(param));
}
//  getUrlVars() {
//   var url = window.location.href,
//       vars = {};
//   url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value){
//        key = decodeURIComponent(key);
//        value = decodeURIComponent(value);
//        vars[key] = value;
//   });
//   return vars;
// }

checkValue(): void { // هذه الدالة لإلغاء تفعيل زر اضافة المنتج للسلة في حال كانت الكمية اكبر
                      // من عشرة واصغر من واحد
  if (this.amount < 1 || this.amount > 10) {
    this.disableButton = true;
  } else {
    this.disableButton = false;
  }
}

// encodeProductName(productName: string): string {
//   return encodeURIComponent(productName.replace(/,/g, '/'));
// }


 add()
 {
   this.item.emit({item:this.data, quantity: this.amount});
 }
}
