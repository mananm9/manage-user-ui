import { Component, OnInit,ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AutoGrid} from './Grid/AutoGrid';
import { UsersService } from '../../services/users.service';
import {UserModelComponent} from '../../Components/user-model.component';
import {UserFilter} from '../../Components/user-model.component';
//import {AutoGridPipe} from './Grid/AutoGridPipe';
import {PartialSearchUserComponent} from './partial-search-user/partial-search-user.component';
// <app-partial-search-user>PartialSearchUserUpdate($event)</app-partial-search-user>

@Component({
  selector:'app-manage-user',
    template: `
      <app-partial-search-user
        [count]="Items2Load" [TotalRows]="TotalRows"
        [filter]="userFilter"
        (update)="PartialSearchUserUpdate($event)">
        
      </app-partial-search-user>
      <AutoGrid
           [Columns]="Columns2Display"
           [Data]="Items2Load"
           [Pages]="Pages"
           [PageIndex]="PageIndex"
           (clickUpdate)="updateClick($event)"
          [AllowDelete]="true" [TotalRows]=TotalRows [PageSize]="PageSize"
          (OnPageChange)="PageIndexChange($event)"
          (OnColumnSort)="PageSort($event)"
          (onFilter) = "onFilterClick($event)"
          >
      </AutoGrid>`,
  providers: [UsersService]
})
export class ManageUserComponent implements OnInit {
  constructor(private userService:UsersService, private router :Router, private route: ActivatedRoute) { 

  }
  Items2Load : any = [];
  TotalRows : number = 1;
  Pages : any = [];
  PageSize : number = 5;
  StartIndex : number = 0;
  userModel=new UserModelComponent;
  userFilter=new UserFilter;
  PageIndex:number=0;
  
  //Columns to display, enable / disalble sort
  //Basicly any column base configuration needed, can be added here
  //Such as Display name, column Icon ....
  Columns2Display : any =[
                  {colDisplayName:"Agt Id", colName: "ebus_agt_id", sortable:true, filterable: false},
                  {colDisplayName:"Login Name", colName: "login_nm", sortable:true,filterable: false},
                  {colDisplayName:"First Name", colName: "frst_nm", sortable:true, filterable: false},
                  {colDisplayName:"Last Name", colName: "lst_nm", sortable:true, filterable: false},
                  {colDisplayName:"Email", colName: "email_addr_txt", sortable:true, filterable: true},
                  {colDisplayName:"Status", colName: "ebus_sts_cd", sortable:true, filterable: true},
                  {colDisplayName:"Created Date", colName: "cre_dtm", sortable:true, filterable: false},
                  {colDisplayName:"Has Role", colName: "has_role", sortable:true, filterable: false}];
  
  
  //Through this we can access the child component through _AutoGrid
  @ViewChild(AutoGrid)  private _AutoGrid:AutoGrid;
  
  //Load the data into the child component
  //Cannot be done inside constructor as you don't have access to ViewChild in constructor
  
  ngOnInit(){
    this.userFilter.login_nm="";
    this.userFilter.frst_nm="";
    this.userFilter.lst_nm="";
    this.userFilter.ebus_sts_cd="";
    this.userFilter.sortDirection="";
    this.userFilter.sortField="";
    this.userFilter.pageSize=5;
    this.userFilter.pageNumber=1;

    // this.myOptions = [
    //         { id: 'Active', name: 'Active' },
    //         { id: 'Inactive', name: 'Inactive' },
    //     ];
    //this._AutoGrid = new AutoGrid();
        //Pass the data to child compoment, through LoadData method
        //this._AutoGrid.LoadData(this.Items2Load);
        //Can be loaded using ajax call or service
        //this._dummy service.LoadItems((res:any)=>{
        //  this._AutoGrid.LoadData(res);
        //});
  
     this.route.data.subscribe((data) => {
       this.Items2Load = data.manage[0];
        this.TotalRows=data.manage[1][0].totalcount;
        this.Pages=[];
        for(let i=0;i<this.TotalRows / this.PageSize;i++)
        this.Pages.push(i+1);
      });

    }
  
 PartialSearchUserUpdate(event:any) {
   console.log(event)
    this.Items2Load = event.count;
    this.TotalRows=event.TotalRows;
    this.userFilter=event.filter;
    this.Pages=[];
    for(let i=0;i<this.TotalRows / this.PageSize;i++)
    this.Pages.push(i+1);
    this.PageIndex=0;
  }
  //Handle the events (PageIndexChanged)
  ngAfterViewInit() {
        //this._AutoGrid.PageIndexChanged$.subscribe(c=> console.log("New page id " + c));
    }
  updateClick(updateRow:any){
    this.router.navigate(['updateUser/'+updateRow.ebus_agt_id]);
  }

  PageIndexChange(index:any)
  {
  
    // pageSize*index -- end
  // (pageSize*index)-(PageSize-1) -- start
    this.userFilter.pageNumber=index;
    this.userFilter.pageSize=this.PageSize;
    this.LoadDate(this.userFilter);
  }

  PageSort(SortDetails:any)
  {
    this.userFilter.sortDirection=SortDetails.SortDirection;
    this.userFilter.sortField=SortDetails.SortColumn;
    this.LoadDate(this.userFilter);
  }

  onFilterClick(srchContent:any){
    console.log(srchContent);
  }

  LoadDate(filter:UserFilter)
  {
    this.userService.searchUserPost(filter).subscribe((result) => {      
      console.log(result) 
      this.Items2Load = result[0];
      this.TotalRows=result[1][0].totalcount;
      this.Pages=[];
      for(let i=0;i<this.TotalRows / this.PageSize;i++)
      this.Pages.push(i+1);
    });
  }
}
