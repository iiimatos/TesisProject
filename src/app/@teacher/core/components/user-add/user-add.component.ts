import { CarreraService } from './../../../../@core/services/carrera.service';
import { UserService } from 'src/app/@core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  public carreras: any;
  public roles: any;
  constructor(private router: Router, private carreraService: CarreraService) {}

  ngOnInit(): void {
    this.carreraService.getAllRoles().subscribe((data) => {
      this.roles = data.roles;
      console.log(this.roles);
    });
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
  }

  goToBackList() {
    this.router.navigate(['teacher/maintenance']);
  }
}
