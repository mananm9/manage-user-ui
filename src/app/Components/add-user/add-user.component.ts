import { Component, OnInit } from '@angular/core';
//import { AddService } from '../add/add.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {UserModelComponent} from '../user-model.component';
import {Router} from '@angular/router';
import { UsersService } from '../../services/users.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UsersService]
})
export class AddUserComponent implements OnInit {
public loadingimg = false;
 public userModel : UserModelComponent;
 //allUsers :any=[];
 //errorMsg :string;
constructor(private _usrservice: UsersService,private router: Router){
this.userModel=new UserModelComponent();

}

  ngOnInit() 
  {
   //this._usrservice.getUsers().subscribe(data1 => this.allUsers = data1, error => this.errorMsg = error);
  }
  reload(){
    location.reload();
  }
 addNewUser(usr: UserModelComponent){   
  this.loadingimg = true;
  var data = {
  		login_nm :this.userModel.login_nm,
  		frst_nm: this.userModel.frst_nm,
      lst_nm:this.userModel.lst_nm,
      email_addr_txt:this.userModel.email_addr_txt,
      phn_addr_txt : this.userModel.phn_addr_txt,
      ebus_sts_cd:this.userModel.ebus_sts_cd? 'ACTIVE':'INACTIVE',
      //date:'21-01-1991',
  		has_role:this.userModel.hasrole ? 'Y': 'N'
     	
    };
   
  //console.log(data);
  //console.log(this.allUsers);
   //var result = _.findWhere(this.allUsers, {login_nm: data.login_nm});
   //console.log(result);
//if(result === null || result === undefined){
      this._usrservice.addNewUser(data)
    .subscribe(res => {
                this.loadingimg = false;
                console.log(res);
                if(res==='success')
                  {
                  alert("User added Successfully");
                  }
                else
                  {
                    alert(res);
                  }

            }, err => {
                this.loadingimg = false;          
               alert(err);
            });
//}
         // else{
            // window.alert("This User Id is already Exist. Please choose another one.");
         //}

  }
}
