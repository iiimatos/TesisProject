import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public carreras:any;
  public roles:any;
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(data=>{
      this.roles= data.roles;
      console.log(this.roles)
    })
    this.userService.getAllCareers().subscribe(data=>{
      this.carreras= data;
    })
  }

  goToBackList(){
    this.router.navigate(['teacher/maintenance']);
  }


}
