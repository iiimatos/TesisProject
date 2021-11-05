import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from 'src/app/@core/models/carrera.interface';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-view-request-home',
  templateUrl: './view-request-home.component.html',
  styleUrls: ['./view-request-home.component.scss']
})
export class ViewRequestHomeComponent implements OnInit {
  solicitudId: number = 0;
  solicitud: ISolitud | undefined;
  
  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitud = data;
        console.log(this.solicitud);
      });
  }

}
