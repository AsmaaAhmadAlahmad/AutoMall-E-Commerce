import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutcsService } from '../services/products.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit  {
id:any;
data:any = {}
loading:boolean = false;

  // قمنا بحقن السيرفيس الاولى  مشان نقرأ معلومات من الراوت لانو بدنا نقرأ رقم المنتج مشان نجيب تفاصيلو
  constructor(private route:ActivatedRoute,
              private produtcsService:ProdutcsService,
              private toastrService: ToastrService)
  {
   this.id = this.route.snapshot.paramMap.get('id'); // قراءة الاي دي من الراوت
   console.log(this.id)
   this.route.queryParams.subscribe(params => {
    this.id = params['productId'];
  });
  }
  ngOnInit(): void {
    this.getProdcutById()
  }


getProdcutById()
{
    this.loading = true;
    this.produtcsService.getProductById(this.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.data = res;
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err)
      }}

    );
  }
}
