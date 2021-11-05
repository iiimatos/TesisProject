import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from 'src/app/@core/models/carrera.interface';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { ViewRequestHomeComponent } from '../../core/components/view-request-home/view-request-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public solicitudes:ISolitud;
  public requests:Array<any>=[];
  constructor(
    private solicitudService:SolicitudService, 
    private router: Router, 
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.solicitudService.getAllRequest().subscribe(data=>{
      this.requests = data;
      console.log(this.requests)
    })
    
  }


  viewModal(id: number) {
    // console.log(id);
    const ref = this.modalService.open(ViewRequestHomeComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
  }

  acceptRequest(id: number){
    this.solicitudService.acceptRequest(id).subscribe(data=>{
      console.log(data);
    })
    
  }
 

}
