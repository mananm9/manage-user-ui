import { Injectable } from '@angular/core';
import { RequestOptions, RequestMethod, RequestOptionsArgs, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(public http:Http) { }

getUsers(){
  return this.http.get('http://localhost:1337/getusers')
  .map(res=>res.json());
};

getUserDetails(userId){
  	return this.http.get('http://localhost:1337/getusersbyid/'+userId)
    .map(res=>res.json());
  };

  userLogin(userDetails){
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post('http://localhost:1337/userLogin',userDetails,options)
  .map(res=>res.json());
  }
  
updateUserDetails(userDetails){
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post('http://localhost:1337/UpdateUser',userDetails,options)
  .map(res=>res.json());
};

//Add new user
addNewUser(data){
let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
let options = new RequestOptions({ headers: headers });
return this.http.post('http://localhost:1337/v1/AddNewUser',data,options)
.map(res=>res.json());
//return this.http.post('http://localhost:1337/getusers', data,options) 
};

//Search user
  //Search user
  searchUserPost(data){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:1337/v1/SearchUser',data,options)
    .map(res=>res.json());
    };

LoginMethod(username){
  let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded' });
  let options = new RequestOptions ({headers:headers});
  return this.http.get('http://localhost:1337/profile/'+username)
  //.map(res=>res.json());
 .map((res) => { return res.json() })
}

}