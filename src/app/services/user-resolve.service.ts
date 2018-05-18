import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from './users.service';
import {UserFilter} from '../Components/user-model.component';

@Injectable()
export class UserResolveService{
  public userModel : UserFilter;
  constructor(private userService:UsersService) {
  this.userModel=new UserFilter();
    this.userModel.login_nm="";
    this.userModel.frst_nm="";
    this.userModel.lst_nm="";
    this.userModel.ebus_sts_cd="";
    this.userModel.sortDirection="";
    this.userModel.sortField="";
    this.userModel.pageNumber=1;
    this.userModel.pageSize=5;
}
  resolve(route: ActivatedRouteSnapshot){
    return this.userService.searchUserPost(this.userModel);
  }
}

@Injectable()
export class UpdateResolveService{

  constructor(private userService:UsersService) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.userService.getUserDetails(route.params.id);
  }
}


