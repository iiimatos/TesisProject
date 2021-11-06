import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  

  constructor(
    private solicitudService:SolicitudService,
    private activateRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    let projectId = this.activateRoute.snapshot.paramMap.get('id');
    this.solicitudService.getAllByIdAndUsers(projectId).subscribe((data)=>{
      console.log(data);
    })
    // this.userService.getUserById(userid).subscribe((data) => {
    //   this.datosUsuarios = data;
    //   this.editarForm.setValue({
    //     id: userid,
    //     nombre: this.datosUsuarios.nombre,
    //     apellido: this.datosUsuarios.apellido,
    //     username: this.datosUsuarios.username,
    //     email: this.datosUsuarios.email,
    //     role: this.datosUsuarios.role.id,
    //     carrera: this.datosUsuarios.carrera_id.id,
    //   });
    // });
  }

  goToBackList(){
    this.router.navigate(['teacher/topicbank/'])
  }
  getDataForm(){

  }
}
