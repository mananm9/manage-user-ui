import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-model',
  template: `user-model Works!`,
  styles: []
})
export class UserModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ebus_agt_id:number;
  login_nm : string;
  frst_nm :string;
  lst_nm  : string;
  phn_addr_txt: string;
  ebus_sts_cd: string;
  date: Date;
  hasrole: string;
  email_addr_txt: string;
   User_nm :string;
}

export class UserFilter implements OnInit {
  
    constructor() { }
  
    ngOnInit() {
    }
    ebus_agt_id:number;
    login_nm : string;
    frst_nm :string;
    lst_nm  : string;
    phn_addr_txt: string;
    ebus_sts_cd: string;
    date: Date;
    hasrole: string;
    email_addr_txt: string;
    sortField:string;
    sortDirection:string;
    pageSize:number;
    pageNumber:number; 
  // pageSize*index -- end
  // (pageSize*index)-(PageSize-1) -- start
  
  }
