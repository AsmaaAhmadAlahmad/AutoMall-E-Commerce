// هنا عم نعرّف الموديل اللي موجود عندي وبدو يتعامل معو كومبونينت ال
// Login
export class RegisterInfo

{

  constructor  ( // بالخواص اللي منعرفهن في المشيد يُعتبروا كحقول موجودين
          public email? : string ,
          public userName? : string ,
          public password? : string ,
          public confirmPassword? : string ,
  ) {

  }
}
