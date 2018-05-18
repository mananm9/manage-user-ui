import { Component, OnInit } from '@angular/core';
import { UserModelComponent } from '../user-model.component'; 
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UsersService]
})
export class UserLoginComponent implements OnInit {
  public message :string;
userModel : UserModelComponent;
  constructor(private userService:UsersService) {
    this.userModel=new UserModelComponent();
    this.message="";
   }

  ngOnInit() {
  }

  LoginUser(){
    let userDetails={
  		loginId: this.userModel.frst_nm,
  		password:this.userModel.lst_nm
    };
    this.userService.userLogin(userDetails).subscribe((result) => {
      this.message=result;
    });
}
}
