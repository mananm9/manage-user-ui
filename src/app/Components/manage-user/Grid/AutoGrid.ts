//Imports
import {Component,Input,Output,EventEmitter} from '@angular/core';
//Needed for triggering events
import {Subject}    from 'rxjs/Subject';
import {Observable}     from 'rxjs/Observable';
//Needed for sorting
import {AutoGridPipe} from './AutoGridPipe';
//Component defention
@Component({
  selector : 'AutoGrid',//tag name in when calling the component
  templateUrl : '/AutoGrid.html',//link the Pipe
  styleUrls: ['./AutoGrid.css']
})
export class AutoGrid
{
  SortBy : string;//This param is used to determine which column to use for sorting
  Direction: number = 1;//1 is ascending -1 is descending
  @Input() Pages : any = [];//Dummy array to load the pagination
  @Input() Data : any = [];//Main data container
  Width:string;
  @Input() AllowDelete : boolean= false;//Can a row be deleted
  @Input() Columns : any = [];//Name of the coulmns to display / order
  @Input() AllowSorting : boolean= true;//Allow client side sorting
  @Input() TotalRows : number = 10;//Total number of rows for paging
  @Input() PageSize : number = 1;
  @Input() PageIndex : number = 0;//To control the start page index
  @Output() clickUpdate = new EventEmitter<any>();
  @Output() OnPageChange = new EventEmitter<any>();
  @Output() OnColumnSort = new EventEmitter<any>();
  public SortDetails=new SortDetails;
  public RowDeleted$ = new Subject<any>();//Subscribe to this to handle delete event
  public PageIndexChanged$ = new Subject<any>();//Subscribe to this to handle "page index change" event

  @Output() onFilter = new EventEmitter<any>();
  public SearchCriteria : string = "";
  public SearchText : string = "";
  public SearchColumn : string = "";

  showDialog:boolean = false;

  public LoadData(_data : any)
  {//Main method to load the data
    this.Data = _data;
  }
  OnUpdate(Row2Update:any)
  {
    //this.RowDeleted$.next(Row2Delete);
    this.clickUpdate.next(Row2Update);
  }

    OnSearchClick(event, colName) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.SearchColumn = colName;
    console.log(target);
    this.showDialog = !this.showDialog;
    //this.firstModal.open();
    /*this.srchPopup.options = {
            cancleBtnClass: "btn btn-default", 
            confirmBtnClass: "btn btn-default",
            color: "#5cb85c",
            header: "Size 60% of page - color = #5cb85c",
            widthProsentage:60,
            animation:"fadeInUp"}
    this.srchPopup.show(this.srchPopup.options);*/
  }

  OnFilterClick(Row2Update:any)
  {
    //this.RowDeleted$.next(Row2Delete);
    console.log("search text", this.SearchText);
    this.onFilter.next({"searchCritera" : this.SearchCriteria, "searchColumn" : this.SearchColumn, "searchText" :this.SearchText});
  }

  OnPageIndexChange(index:number)
  {//private method to raise RowDeleted
    //this.PageIndex = index-1;
    this.OnPageChange.next(index);
    //this.PageIndexChanged$.next(index-1);
  }
  ngOnInit(){
    //used for pagination style
    this.GeneratePaging();
  }
  ngAfterViewInit() {
    //fill the dummy array    
  }

  public GeneratePaging()
  {
    //this.Pages.clear();
    let totalPages : any = (this.TotalRows / this.PageSize);
    this.Width = ((totalPages * 38) + totalPages * 2) + "px";
    // for(let i=0;i<this.TotalRows / this.PageSize;i++)
    // this.Pages.push(i+1);
  }
   Sort(key:string,dir:number, col:any){

    // this.Direction = dir;
      // col.Direction = (this.Direction == 1) ? -1 : 1;
      // //console.log((this.Direction == 1) ? -1 : 1);
      //     let sortDetails=key+",".concat((this.Direction == 1) ? "asc" :"desc");
      //     console.log(sortDetails);
      //   this.OnColumnSort.next(sortDetails);

         for (let column of this.Columns) {
          column.Direction = undefined;
        }
      //  this.SortBy = key;
       this.Direction = dir;
    col.Direction = (this.Direction == 1) ? -1 : 1;
    //console.log((this.Direction == 1) ? -1 : 1);
    this.SortDetails.SortColumn=key;
    this.SortDetails.SortDirection=(this.Direction == 1) ? "asc" :"desc";
      this.OnColumnSort.next(this.SortDetails);
    };
}

export class SortDetails {
  SortColumn:string;
  SortDirection:string;
}