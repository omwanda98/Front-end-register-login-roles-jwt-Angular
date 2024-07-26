import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component'; // Ensure correct import
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    CustomerDashboardComponent // Ensure this is declared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Ensure FormsModule is imported
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
