import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/Forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { UsersService } from  './services/users.service';
import { AppComponent } from './app.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { UserModelComponent } from './Components/user-model.component';
import { DatePickerModule } from 'ng2-datepicker';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { ManageUserComponent } from './Components/manage-user/manage-user.component';
import { UserResolveService, UpdateResolveService } from './services/user-resolve.service';
import{AutoGridPipe} from './Components/manage-user/grid/AutoGridPipe'
import{AutoGrid} from './Components/manage-user/grid/AutoGrid';
import { PartialSearchUserComponent } from './Components/manage-user/partial-search-user/partial-search-user.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LoadingModule } from 'ngx-loading';
import { GridSrchFilterComponent } from './Components/manage-user/Grid/grid-srch-filter/grid-srch-filter.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';


const appRoutes:Routes =[
  //{path:'', component:AppComponent},
  {path:'manageUser', component : ManageUserComponent,resolve: { manage: UserResolveService} },
  {path:'addNewUser', component : AddUserComponent},
  { path:'updateUser/:id', component : UpdateUserComponent, resolve: { update:UpdateResolveService }},
  {path:'login',component : UserLoginComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserModelComponent,
    UpdateUserComponent,
    ManageUserComponent,
    AutoGridPipe,
    AutoGrid,
    PartialSearchUserComponent,
    GridSrchFilterComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MultiselectDropdownModule   ,
    LoadingModule
  ],
  providers: [UsersService, UserResolveService, UpdateResolveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
