import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { FullPageLoaderComponent } from './views/full-page-loader/full-page-loader.component';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

import { AuthGuard, AuthGuardLogin } from './auth.guard';

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    FullPageLoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/dashboard' }
    ])
  ],
  providers: [AuthGuard, AuthGuardLogin],
  bootstrap: [AppComponent],
})
export class AppModule {}
