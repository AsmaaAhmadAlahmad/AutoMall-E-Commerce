import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from './services/categories.service';
import { Category } from './models/category';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent],
})
export class CategoriesComponent implements OnInit {
  loading!: boolean;
  allCategories!: Category[];
  index!:number;
  formCategoryName!: string;
  categoryId!: Guid;
  editData!: NgForm;
  formStatus: string = 'Add'; // هذا المتغير من اجل تغيير عنوان الفورم في حال الاضافة او التعديل و شي كثير حلو بصراحة
  constructor(
    private categoryService: CategoriesService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  onSubmit(form: NgForm) {
    if (this.formStatus == 'Add') this.addCategory(form);

    else if (this.formStatus == 'Edit') {
      this.editCategory();
      form.reset();
      this.formStatus = 'Add';
    }
  }

  // اضافة صنف
  addCategory(form: NgForm) {
    let category: Category = form.value;
    this.loading = true;
    this.categoryService.addCategory(category).subscribe({
      next: () => {
        this.toastrService.success('Data Inserted Successfully.');
        this.loading = false;
        this.allCategories.push(category); // هذا السطر حتى يتم تحديث الجدول الذي يعرض التصنيفات في الواجهة
                                          // حيث بعد نجاح الاضافة العنصر الى قاعدة البيانات يتم اضافة العنصر
                                          // فيتم عرضه في الواجهة allCategories ايضا الى
        form.reset();
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err);
      },
    });
  }

  // جلب كل الاصناف
  getAllCategory() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.allCategories = data;
        this.loading = false;
        console.log(data);
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err.message);
      },
    });
  }

  // هذا الدالة يتم تنفيذها عند الضغط على زر التعديل الذي في الجدول ولا تقوم بتعديل الصنف
  onEditClick(category: Category, editData: NgForm,index:number) {
    this.formStatus = 'Edit';
    this.categoryId = category.id;
    console.log(this.categoryId)
    this.formCategoryName = category.name; // تم كتابة هذا السطر مشان وقت بدي عدل الصنف ولما اضغط
                                           // على زر تعديل يجي اسم الصنف وينحط في انبوت اسم الصنف
    this.editData = editData;
    this.index = index;
  }

  // تعديل صنف
  editCategory() {
    let category: Category = this.editData.value;
    this.loading = true;
    this.categoryService
      .UpdateCategory(this.categoryId, this.editData.value)
      .subscribe({
        next: () => {
          this.loading = false;
          console.log(this.categoryId)
          this.allCategories.splice(this.index,1) // السطر هذا والذي تحته تم وضعهما من اجل أن يتعدل
                                                  // الجدول في الواجهة بعد التعديل ويظهر العنصر بشكله بعد
                                                  // أن تعدل حيث بذلك تجنبت ارسال طلب الى الباكايند
                                                  // من اجل ان يتم جلب البيانات بعد التعديل
          this.allCategories.push(category);
          this.toastrService.success('Data Updated Successfully');
        },
        error: (err) => {
          this.toastrService.error(err);
          this.loading = false;
        },
      });
  }

  // حذف صنف
  onDelete(id:Guid, index:number){
    this.loading=true;
    this.categoryService.deleteCategory(id)
    .subscribe({
      next: () => {
        this.loading = false;
        this.toastrService.success('Data Delete Successfully');
       // لإزالة الصنف المحذوف من الجدول بعد نجاح عملية حذفه من القاعدة
        this.allCategories.splice(index,1)
      },
      error: (err) => {
         this.toastrService.error(err, '', {
          timeOut: 2000,
          progressBar: true,
        });
        this.loading = false;
      },
    });
  }

}
