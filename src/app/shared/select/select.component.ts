import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',

})
export class SelectComponent  {

  constructor(private fb: FormBuilder) {}
  @Input() widthValue: string = '';
  @Input() messageForDefaultOption!: string;
  @Input() showAllOption: boolean = true;
  @Input() showDefaultOption: boolean = false;
  @Output() formCreated = new EventEmitter<FormGroup>();
  @Input() formControlName!: string;
  @Input() isMultiple = false; // أم لا وذلك يتم عند استدعاء هذا الكومبونينت في الكومبونينت الاب  multiple  في هذه الخاصية يتم تحديد اذا القائمة هي

  ngOnInit() {
    if (this.formControlName) {
      this.form.addControl(
        this.formControlName,
        new FormControl('', Validators.required)
      );
      this.formCreated.emit(this.form);
    }
  }

  form = this.fb.group({});
  @Input() title: string = ''; // هذا المتغير تم استخدامه في الفيو وستأتي قيمته من  الاب
                               // الذي سيتم استدعاء هذا الكومبونينت فيه لذلك سيتم وضع انبوت له
  @Input() data: any[] = []; // هذا المتغير تم استخدامه في الفيو وستأتي قيمته من  الاب
                             // الذي سيتم استدعاء هذا الكومبونينت فيه لذلك سيتم وضع انبوت له
  @Output() selecteValue = new EventEmitter(); // ارسال قيمة للأب حيث ستككون القيمة المختارة من القائمة
                                               // لذلك تم وضع اوتبوت

  detectChanges( event: any ) { // هذه الدالة تم استخدامها في الفيو
    this.selecteValue.emit(event);
    console.log(event.target.value);
    console.log(event);
  }
}
