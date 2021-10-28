import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})

export class MaintenanceComponent implements OnInit {

  public users:Array<any>=[];
  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any )=>{
      this.users = data;
    })
    
  }

  deleteUsuario(id:any){
    this.userService.deleteUser(id).subscribe(data=>{
      console.log(data);
      this.router.navigate(['teacher/maintenance/'])
    })
    

  }

  editarUsuario(id:any){
    this.router.navigate(['teacher/maintenance/user-edit/', id])

  }

  nuevoUsuario(){
    this.router.navigate(['teacher/maintenance/user-add/'])
  }

  

}
