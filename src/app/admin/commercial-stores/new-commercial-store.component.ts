import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '../../shared/select/select.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CategoriesService } from '../categories/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../categories/models/category';
import { CommercialStoreService } from './services/commercial-store.services';
import { FloorNumber } from '../../enums/FloorNumber';
import { Guid } from 'guid-typescript';
import { ImageService } from '../../shared/services/image.service';


@Component({
  selector: 'app-commercial-stores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectComponent,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent,
  ],
  templateUrl: './new-commercial-store.component.html',
  styleUrl: './new-commercial-store.component.css'
})
export class NewCommercialStoreComponent implements OnInit
{

    public FloorNumberEnum=FloorNumber;

    //  categoriesControl= new FormControl()
    //  name= new FormControl('', Validators.required)
      //  shop_rent= new FormControl('',  [Validators.required, Validators.pattern('^[0-9]*.?[0-9]+$')])
      //  shop_owner_name= new FormControl('', Validators.required)
      //  departmentId= new FormControl('', Validators.required)
      //  file= new FormControl('', Validators.required)

  loading!:boolean;
  commercialStoreForm!: any;
  selectedImage!: any;
  permaLink!: string;
  imgSrc: any = './assets/images/placeholder-image.png';
  allCategories!: Category[];
  selectedCategories!:any;
  ngOnInit(): void {
    this.getAllCategories();
  }


  constructor(
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private  commercialStoreServices: CommercialStoreService,
    private imageService: ImageService
  ) {
    this.commercialStoreForm = new FormGroup({
      name: new FormControl('', Validators.required),
      shop_rent: new FormControl('',  [Validators.required, Validators.pattern('^[0-9]*.?[0-9]+$')]),
      shop_owner_name: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      categoriesControl: new FormControl('', Validators.required),
      });
    }


  // showPreview($event: any) { // رح علقها حاليا مشان حطها في سيرفيس مشتركة ثم اقوم باستدعائها من السيرفيس لانها موجودة في اكثر من كومبونينت
  //   var reader = new FileReader();
  //   reader.onload = (e) => (this.imgSrc = e.target?.result);
  //   reader.readAsDataURL($event.target.files[0]);
  //   this.selectedImage = $event.target.files[0]; // من هذا المتغير يمكنني ان أحصل على اسم الصورة ومسارها
  //   console.log(this.selectedImage);
  //   console.log($event);
  // }




  // onFileSelected(event: any): void {
  //   this.imageService.showPreview(event, (src) => this.imgSrc = src);
  // }

  onFileSelected(event: any): void {
    this.imageService.showPreview(event).subscribe({
       next: (result) => {
         this.imgSrc = result.dataUrl;
         this.selectedImage = result.selectedImage;
         console.log(this.selectedImage)
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


  onTitleChanged($event: any) { //عاساس انو رح  permaLink هاي الدالة كانت مشان اللي يتم كتابتو بحقل التايتل يتم كتابتو فورا في حقل ال
                                 // يكون رابط وهيك شي
    const title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');
  }











addCommercialStore() {
this.loading = true;

  const name = this.commercialStoreForm.controls['name'].value;
  const shopRent =this.commercialStoreForm.controls['shop_rent'] .value;
  const departmentId = this.commercialStoreForm.controls['departmentId'].value;
  const shopOwnerName = this.commercialStoreForm.controls['shop_owner_name'].value;

  // جمع الفئات المختارة
  const selectedCategories = this.commercialStoreForm.controls['categoriesControl']?.value?.map((id: string) => ({ id }));

  // FormData إنشاء كائن
  const formData = new FormData();
  formData.append('name', name);
  formData.append('shop_rent', shopRent);
  formData.append('departmentId', departmentId);
  formData.append('shop_owner_name', shopOwnerName);
  formData.append('file', this.selectedImage);

  // FormData إضافة الفئات المختارة إلى
  if (selectedCategories) {
    selectedCategories.forEach((category: any, index:number) => {
      formData.append(`CategoriesForCreateForCommercialStores[${index}].id`, category.id);
    });
  }

        // FormData طباعة محتويات
    formData.forEach((value, key) => {
      console.log(`${key}: ${value.valueOf}`);
    });

  // FormData إرسال  إلى الباك إند
  this.commercialStoreServices.addCommercialStore(formData).subscribe({
  next: (res) => {
    this.loading = false;
    this.toastrService.success('Data Inserted Successfly', '', {
      timeOut: 2000,
      progressBar: true,
    });
  this.commercialStoreForm.reset();
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
