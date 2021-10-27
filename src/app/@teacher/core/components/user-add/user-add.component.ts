import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, IUser2 } from 'src/app/@core/models/user.interface';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  nuevoForm= new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(0),
    carrera_id: new FormControl('')
  })
  public carreras:any;
  public roles:any;
  constructor(private router:Router, private userService:UserService) { }


  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(data=>{
      this.roles= data.roles;
    })
    this.userService.getAllCareers().subscribe(data=>{
      this.carreras= data;
    })
  }

  postForm(form:IUser2){
     form.role = Number(form.role)
     console.log(form);
    //  this.userService.postUser(form).subscribe(data=>{
    //   console.log(data);
    //   this.router.navigate(['teacher/maintenance']);
    // })
    
  }

  goToBackList(){
    this.router.navigate(['teacher/maintenance']);
  }


}
