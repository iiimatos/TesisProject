import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrls: ['./project-request.component.scss']
})
export class ProjectRequestComponent implements OnInit {

  public requests:Array<any>=[];
  constructor(private solicitudService:SolicitudService, private router: Router) { }

  ngOnInit(): void {
    this.solicitudService.getAll().subscribe(data=>{
      console.log(data.carrera_id.id);
      this.requests =data;
    })
    
  }



}
