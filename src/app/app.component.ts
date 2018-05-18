import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router'
import {DatePickerOptions , DateModel} from 'ng2-datepicker';

import { UserModelComponent } from './Components/user-model.component';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
//template: '<app-add> </app-add>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loading : boolean = true;
  date: DateModel;
  options: DatePickerOptions = {
format:'DD-MM-YYYY',
todayText: 'today',
style: 'big'

  };


public userModel : UserModelComponent;
public tempdata :string;
public boolflag : boolean = false;
 public showflag:boolean =false;

constructor(private router:Router,private _usrservice: UsersService)
{

  this.userModel=new UserModelComponent();
  router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event)
    })
  this.options=new DatePickerOptions();
}
navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
}
  LoginPage1()
  {this.router.navigate(['./']);
    this.showflag=true;
    this.boolflag=false;
  }
 
   Login(usr: UserModelComponent)
   {
     //this.router.navigate(['login']);
  this._usrservice.LoginMethod(this.userModel.User_nm)
     .subscribe(res => {
                //this.boolflag=false;
                  // alert(res.FirstName);
                   console.log(res);

              if(res.FirstName!=null)
                {

                   for(let i of res.Roles.Role)
                 {
                   //console.log(i.RoleCode);
                
                  
                   if((i.RoleCode)==('IIP_USER'))
                    {
                      
                this.tempdata=i.RoleCode;
                
                 this.showflag=false;
                 this.boolflag=true;
                 this.router.navigate(['manageUser']);
                break;
                     }
            
                  
                }
                }
              else
                {
                 alert("Invalid UserId");
                }

                 if(this.tempdata==null && res.FirstName==null ){
                 
                  this.showflag=true;
                  this.boolflag=false;
                 this.router.navigate(['AccessDenied']); 
                }
                  
               //...
            }, err => {
                
                alert("Login page: error !")
            });

  }
}
