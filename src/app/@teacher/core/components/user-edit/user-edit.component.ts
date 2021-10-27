import { CarreraService } from './../../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/@core/models/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public datosUsuarios: any;
  public carreras: any;
  public roles: any;
  editarForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    carrera: new FormControl(''),
  });
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private carreraServices: CarreraService
  ) {}

  ngOnInit(): void {
    let userid = this.activateRoute.snapshot.paramMap.get('id');
    this.carreraServices.getAllRoles().subscribe((data) => {
      this.roles = data.roles;
      console.log(this.roles);
    });
    this.carreraServices.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.userService.getUserById(userid).subscribe((data) => {
      this.datosUsuarios = data;
      console.log(this.datosUsuarios);
      this.editarForm.setValue({
        id: userid,
        nombre: this.datosUsuarios.nombre,
        apellido: this.datosUsuarios.apellido,
        username: this.datosUsuarios.username,
        email: this.datosUsuarios.email,
        role: this.datosUsuarios.role,
        carrera: this.datosUsuarios.carrera_id,
      });
      console.log(this.editarForm.value);
    });
  }

  goToBackList() {
    this.router.navigate(['teacher/maintenance']);
  }
}
