import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/@core/models/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  
  public datosUsuarios:IUser;
  public carreras:any;
  public roles:any;
  editarForm= new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    carrera: new FormControl('')
  })
  constructor(private router:Router, private activateRoute:ActivatedRoute, private userService:UserService  ) { }

  ngOnInit(): void {
    let userid= this.activateRoute.snapshot.paramMap.get('id');
    this.userService.getAllRoles().subscribe(data=>{
      this.roles= data.roles;
    })
    this.userService.getAllCareers().subscribe(data=>{
      this.carreras= data;
    })
    this.userService.getUserById(userid).subscribe(data=>{
      this.datosUsuarios = data;
      this.editarForm.setValue({
        'id': userid,
        'nombre': this.datosUsuarios.nombre,
        'apellido': this.datosUsuarios.apellido,
        'username': this.datosUsuarios.username,
        'email': this.datosUsuarios.email,
        'role': this.datosUsuarios.role.id,
        'carrera': this.datosUsuarios.carrera_id.id
      })
    })
  }

  postForm(form:IUser){
    const datosUsuarios = form
    const userid = this.datosUsuarios?.id
    this.userService.putUser(form, userid).subscribe(data=>{
      this.router.navigate(['teacher/maintenance']);
    })
  }

  goToBackList(){
    this.router.navigate(['teacher/maintenance']);
  }

}
