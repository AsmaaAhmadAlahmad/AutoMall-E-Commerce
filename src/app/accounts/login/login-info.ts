// هنا عم نعرّف الموديل اللي موجود عندي وبدو يتعامل معو كومبونينت ال
// Login
export class LoginInfo

{

  constructor  ( // بالخواص اللي منعرفهن في المشيد يُعتبروا كحقول موجودين
          public email? : string ,
          public password? : string ,
  ) {

  }
}
