import { LoginService } from '../../services/login.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import {} from 'jest-image-snapshot';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent snapshots test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should matches the current snapshot with component', () => {
    expect(fixture).toMatchSnapshot();
  });
});

class RouterStub {
    url = '';
    // tslint:disable-next-line:typedef
    navigate(commands: any[], extras?: any) { }
  }

describe('LoginComponent functions', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService: LoginService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ReactiveFormsModule, RouterTestingModule],
        providers: [{ provide: Router, useClass: RouterStub }]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
    });

    test('Should does nothing when form is invalid', () => {
        const spy = jest.spyOn(loginService, 'login');
        component.submit();
        expect(spy).not.toHaveBeenCalled();
        expect(component.spinner).toEqual(false);
    });

    test('Should does login when form is valid', (done) => {
        component.loginForm.setValue({username: 'test', password: 'passtest'});
        component.submit();
        expect(component.spinner).toEqual(true);
        setTimeout(() => {
        expect(component.spinner).toEqual(false);
        const jwt = sessionStorage.getItem('jwt');
        expect(jwt).not.toBeNull();
        done();
        }, 3000);
    });

    test('Should does not save jwt when service does not return it', (done) => {
        component.loginForm.setValue({username: 'test', password: 'passtest'});
        const $obs = new Observable<object>(observer => {
        setTimeout(() => {
            observer.next(undefined);
        }, 100);
        });
        const spy = jest.spyOn(loginService, 'login').mockReturnValue($obs);
        component.submit();
        setTimeout(() => {
        const jwt = sessionStorage.getItem('jwt');
        expect(jwt).toStrictEqual('null');
        done();
        }, 500);
    });

});
