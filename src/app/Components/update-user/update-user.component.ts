import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModelComponent } from '../user-model.component'; 
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [UsersService]
})
export class UpdateUserComponent implements OnInit {
  public loadingimg= true;
  userModel : UserModelComponent;
  userId : any;
  constructor (private userService:UsersService, private route: ActivatedRoute) {
    this.userId = route.snapshot.params['id'];
   }

  ngOnInit(){
    this.loadingimg = true;
    this.route.data.subscribe((data) => {
          this.userModel=data.update[0];
          this.userModel.ebus_sts_cd=data.update[0].ebus_sts_cd.toUpperCase();
          this.userModel.hasrole=data.update[0].has_role.trim();
      });
         this.loadingimg = false;
  }

  updateUser(){
     this.loadingimg = true;
    let userDetails={
  		ebus_agt_id :this.userModel.ebus_agt_id,
  		frst_nm: this.userModel.frst_nm,
  		lst_nm:this.userModel.lst_nm,
  		login_nm:this.userModel.login_nm,
  		email_addr_txt:this.userModel.email_addr_txt,
  		phn_addr_txt:this.userModel.phn_addr_txt,
      ebus_sts_cd:this.userModel.ebus_sts_cd,
      has_role:this.userModel.hasrole
    };
    this.userService.updateUserDetails(userDetails)
    .subscribe((result) => {
      if(result=="success")
        this.loadingimg = false;
        alert("User updated successfully");
        }, err => {
                this.loadingimg = false;
      });
    
    

  }

}

