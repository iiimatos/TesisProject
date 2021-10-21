import { Component, OnInit } from '@angular/core';
import { IMeData } from 'src/app/@core/models/user.interface';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  session: IMeData = {
    status: false,
  };
  access = false;
  role: string = '';
  userLabel = '';
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getMe().subscribe((data) => {
      this.userLabel = `${data.nombre} ${data.apellido}`;
      this.role = data.role.name;
    });
  }
}
