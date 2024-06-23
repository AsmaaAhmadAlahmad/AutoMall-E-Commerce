// src/app/shared/image.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

 showPreview(event: any): Observable<{ dataUrl: string | ArrayBuffer | null, selectedImage: File }> {
  return new Observable(observer => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string | ArrayBuffer | null;
      const selectedImage = event.target.files[0];
      observer.next({ dataUrl, selectedImage }); // إرسال النتيجة للمشتركين
      observer.complete(); // إتمام ال Observable عند اكتمال عملية القراءة
    };

    // في حالة وجود خطأ في قراءة الملف
    reader.onerror = (error) => {
      observer.error(error);
    };

    // قراءة الملف كـ Data URL
    reader.readAsDataURL(event.target.files[0]);
  });
}

}
