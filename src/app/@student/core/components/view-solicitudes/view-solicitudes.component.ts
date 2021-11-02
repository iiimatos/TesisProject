import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from './../../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-solicitudes',
  templateUrl: './view-solicitudes.component.html',
  styleUrls: ['./view-solicitudes.component.scss'],
})
export class ViewSolicitudesComponent implements OnInit {
  solicitudId: number = 0;
  solicitud: ISolitud | undefined;

  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitud = data;
        console.log(this.solicitud);
      });
  }
}
