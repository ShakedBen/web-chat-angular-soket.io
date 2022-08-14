import { Component, OnInit,  ElementRef  } from '@angular/core';
import { NgForm } from "@angular/forms";
import { from } from 'rxjs';
import { AuthService } from "../auth/auth.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  public name:string;
  public email:string;
  public phone:number;

  public fileName:string;
  imagePreview: string;

  private userName;
  private userId;



  mypro_img:string="/assets/proImg/pro_img.png";
  constructor(private authService: AuthService,private elementRef: ElementRef) {

    this.userName=this.authService.getUserName()
    this.userId=this.authService.getUserId()
    this.name=this.userName;
    this.email=this.authService.getUserEmail();
    this.phone=this.authService.getUserPhone();




  }

  onChangeName(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.updateUserName(form.value.name,this.userId);



  }
  onChangeEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }
   // this.isLoading = true;

    this.authService.updateUserEmail(form.value.email,this.userId);
  }
  onChangePassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.updateUserPassword(form.value.password,this.userId);
   // this.isLoading = true;

  }
  onChangePhone(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authService.updateUserPhone(form.value.phone,this.userId);
  }







  ngOnInit(): void {


}
}
