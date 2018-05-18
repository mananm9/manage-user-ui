import { Component, OnInit, ViewChild,Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {UserModelComponent} from '../../../Components/user-model.component';
import {UserFilter} from '../../../Components/user-model.component';
import {AutoGrid} from '../Grid/AutoGrid';
import { UsersService } from '../../../services/users.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-partial-search-user',
  templateUrl: './partial-search-user.component.html',
  styleUrls: ['./partial-search-user.component.css'],
   providers: [UsersService]
})
export class PartialSearchUserComponent implements OnInit {
  public loadingimg = false;
optionsModel: string[]=[];
    myOptions: IMultiSelectOption[];
public userModel : UserFilter;

  @Input() count : any = [];
  @Input() TotalRows :number; 
  @Input() filter= new UserFilter;
   @Output() update = new EventEmitter<any>();
  constructor(private userService:UsersService,private router: Router) { 
    this.userModel=new UserFilter();
    
      }   

  ngOnInit() {
    this.userModel.login_nm="";
    this.userModel.frst_nm="";
    this.userModel.lst_nm="";
    this.myOptions = [
            { id: 'Active', name: 'Active' },
            { id: 'Inactive', name: 'Inactive' },
        ];
    this.userModel.sortDirection="";
    this.userModel.sortField="";
    this.userModel.pageSize=5;
    this.userModel.pageNumber=1;
    
  }

 
   performSearch(usr: UserFilter){  
      this.loadingimg = true;
     usr.ebus_sts_cd=this.optionsModel.toString();     
    this.userService.searchUserPost(usr).subscribe((result) => {     
        this.update.emit({
      count: result[0],
      TotalRows:result[1][0].totalcount,
      filter:usr
    });    
    this.loadingimg = false;  
      });
   
  }
      
}

