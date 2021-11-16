import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    setTimeout(() => {
      this.authService.resetSession();
      this.router.navigate(['/']);
    }, 1500);
  }
}
