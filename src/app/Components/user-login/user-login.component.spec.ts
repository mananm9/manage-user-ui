import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserLoginComponent } from './user-login.component';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let componentFixture:any;
let service:any;
describe('UserLoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ FormsModule, HttpModule ],
      declarations: [ UserLoginComponent ],
    })
    .overrideComponent(UserLoginComponent, {
        set: {
          providers: [
            { provide: UsersService, useValue: new MockUsersService() }
          ]
        }
      })
    .compileComponents().then(()=>{
      componentFixture = TestBed.createComponent(UserLoginComponent);
      service = componentFixture.componentRef.injector.get(UsersService);
    });
  }));

  it('should create', () => {
    expect(componentFixture).toBeTruthy();
  });
  it('should display msg', () => {
    let component=componentFixture.componentInstance;
    component.LoginUser();
    expect(component.message).toContain('test');
});

});
class MockUsersService {
  public userLogin(userDetails) {
    return Observable.of('testing service');
  }
};