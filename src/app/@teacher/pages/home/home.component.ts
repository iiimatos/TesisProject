import { IHistorial } from './../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from 'src/app/@core/models/carrera.interface';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { ViewRequestHomeComponent } from '../../core/components/view-request-home/view-request-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public solicitudes: ISolitud;
  public requests: Array<any> = [];
  constructor(
    private solicitudService: SolicitudService,
    private modalService: NgbModal,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.solicitudService.getAllRequestHome().subscribe((data) => {
      this.requests = data;
    });
  }

  viewModal(id: number) {
    // console.log(id);
    const ref = this.modalService.open(ViewRequestHomeComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
  }

  acceptRequest(id: number) {
    this.solicitudService.acceptRequest(id).subscribe((_) => {
      this.refresh();
    });
  }
  cancelRequest(id: number, i: number) {
    this.solicitudService.cancelRequest(id).subscribe((_) => {
      this.carreraService
        .editTemaSeleccionadoValue(this.requests[i].tema_id.id, false)
        .subscribe((_) => {
          const history: IHistorial = {
            observacion: 'Solicitud rechazada',
            estatus: { id: '7' },
            solicitudes_tema: { id },
          };
          this.solicitudService.addObsRequest(history).subscribe((_) => {
            window.location.reload();
          });
        });
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
