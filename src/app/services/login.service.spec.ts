import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';


describe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient
      ]
    }).compileComponents();

    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
  });

  test('should injectes the service', () => {
    expect(service).toBeTruthy();
  });
});
