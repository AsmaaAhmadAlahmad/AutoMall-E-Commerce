import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../categories/services/categories.service';
import { Category } from '../../categories/models/category';
import { ToastrService } from 'ngx-toastr';
import { SelectComponent } from '../../../shared/select/select.component';
import { ProductsService } from '../services/products.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { CommercialStoreService } from '../../commercial-stores/services/commercial-store.services';
import { ImageService } from '../../../shared/services/image.service';
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectComponent,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  // formControlName:any = 'commercialStoreId'; // app-select التي سأقوم بتمريرها للابن الذي هو formControlName قيمة ا
  imgSrc: any = './assets/images/placeholder-image.png';
  permaLink!: string;
  selectedImage!: any;
  allCategories!: Category[];
  allCommercialStores!: any;
  productForm!: FormGroup;
  loading!: boolean;
  commercialStore!: any;

  constructor(
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private commercialStoreService: CommercialStoreService,
    private productService: ProductsService,
    private imageService: ImageService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      // commercialStoreId: ['', [Validators.required]],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*.?[0-9]+$')],
      ],
      description: ['', [Validators.required]],
      imageFile: ['', Validators.required],
    });





  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCommercialStores();
  }

  getAllCommercialStores() {
    this.commercialStoreService.getAllCommercialStores().subscribe({
      next: (res) => {
        this.allCommercialStores = res;
        console.log(res);
      },
      error: (err) => {
        this.toastrService.error(err, '', {
          timeOut: 1000,
          progressBar: true,
        });
      },
    });
  }



  onTitleChanged($event: any) {
    //عاساس انو رح  permaLink هاي الدالة كانت مشان اللي يتم كتابتو بحقل التايتل يتم كتابتو فورا في حقل ال
    // يكون رابط وهيك شي
    const title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');
  }







  onFileSelected(event: any): void {
    this.imageService.showPreview(event).subscribe({
        next: (res)  => {
         this.imgSrc = res.dataUrl,
         this.selectedImage = res.selectedImage
        },
      });
  }


  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res;
      },
      error: (err) => {
        this.toastrService.error(err, '', {
          timeOut: 1000,
          progressBar: true,
        });
      },
    });
  }

  formInitialized(name: any, CommercialStoreSelectform: FormGroup) {
    this.productForm.addControl(name, CommercialStoreSelectform);
  }

  addProduct() {
    this.loading = true;
    if (this.productForm.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append(
        'commercialStoreId',
        this.productForm.get('commercialStoreId')?.value.commercialStoreId
      );
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('file', this.selectedImage);
      //  this.productForm.value.FileName = this.selectedImage.name;
      this.productService.uploadProduct(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.toastrService.success(res.message, '', {
            timeOut: 2000,
            progressBar: true,
          });
          this.productForm.reset(); // إعادة تعيين النموذج
          this.imgSrc = './assets/images/placeholder-image.png';
        },
        error: (err) => {
          this.loading = false;
          this.toastrService.error(err, '', {
            timeOut: 2000,
            progressBar: true,
          });
        },
      });
    }
  }
}
