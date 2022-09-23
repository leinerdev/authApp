import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  `],
})
export class HomeComponent {
  get user() {
    return this.authService.user
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.router.navigateByUrl('/auth/login')
  }
}
