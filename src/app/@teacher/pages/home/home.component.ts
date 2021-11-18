import { IHistorial } from './../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from 'src/app/@core/models/carrera.interface';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { ViewRequestHomeComponent } from '../../core/components/view-request-home/view-request-home.component';
import Swal from 'sweetalert2';

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

  acceptRequest(id: number, i: number) {
    Swal.fire({
      title: 'Deseas aceptar esta solicitud?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.acceptRequest(id).subscribe((data) => {
          this.carreraService
            .editTemaSeleccionadoValue(this.requests[i].tema_id.id, {
              seleccionado: false,
            })
            .subscribe((_) => {
              const history: IHistorial = {
                observacion: 'Solicitud aceptada',
                estatus: { id: '2' },
                solicitudes_tema: { id },
              };
              this.solicitudService.addObsRequest(history).subscribe((_) => {
                window.location.reload();
              });
            });
        });
        Swal.fire(
          '¡Aceptado!',
          'Solicitud fue aceptada correctamente!.',
          'success'
        );
      }
    });
  }
  cancelRequest(id: number, i: number) {
    Swal.fire({
      title: 'Deseas eliminar esta solicitud?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.cancelRequest(id).subscribe((_) => {
          this.carreraService
            .editTemaSeleccionadoValue(this.requests[i].tema_id.id, {
              seleccionado: false,
            })
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
        Swal.fire(
          'Eliminado!',
          'Solicitud fue eliminada correctamente!.',
          'success'
        );
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
