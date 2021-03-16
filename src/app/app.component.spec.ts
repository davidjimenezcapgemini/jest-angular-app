import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import {} from 'jest-image-snapshot';


describe('AppComponent functions', () => {
  let http: HttpClient;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    http = TestBed.inject(HttpClient);
  });

  test('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'jest-app'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jest-app');
  });

  test('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('jest-app app is running!');
  });

  test('should dispatch an EventEmitter', (done) => {
    const data = { test: true };
    fixture.detectChanges();
    fixture.componentInstance.finishEv.subscribe((res: any) => {
      expect(res).toEqual(data);
      done();
    });
    fixture.componentInstance.fireFinish(data);
  });

  test.each([
    [100, 21],
    [200, 42]
  ])
  ('should calculates the iva from price param', (price, expected) => {
    const iva = fixture.componentInstance.calculateIva(price);
    expect(iva).toEqual(expected);
  });


  test('should gets data from observable', async () => {
    const promise = fixture.componentInstance.getDataFromSource();
    const data = await promise;
    expect(data).toEqual('Data from observable');
  });


  test('should gets data from API', () => {
    const spy = jest.spyOn(http, 'get').mockReturnValue(new Observable(observer => observer.next('DATA FROM API')));
    fixture.componentInstance.getDataFromAPI();
    expect(fixture.componentInstance.data).toEqual('DATA FROM API');
    expect(spy).toHaveBeenCalled();
  });

});


describe('App Component snapshots test', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  test('should be matched with initial template', () => {
    expect(fixture).toMatchSnapshot();
  });
});

