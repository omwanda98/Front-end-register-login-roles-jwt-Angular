import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenInterceptor } from './token.interceptor'; // Corrected import

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for testing
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } // Provide TokenInterceptor
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy(); // Ensure that the interceptor is created
  });

  // Add additional tests here to validate the interceptor functionality
});
