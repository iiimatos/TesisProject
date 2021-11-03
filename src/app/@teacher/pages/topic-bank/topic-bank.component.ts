import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from './../../../@core/services/solicitud.service';
import { ISolitud } from './../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { ViewRequestComponent } from '../../core/components/view-request/view-request.component';

@Component({
  selector: 'app-topic-bank',
  templateUrl: './topic-bank.component.html',
  styleUrls: ['./topic-bank.component.scss'],
})
export class TopicBankComponent implements OnInit {
  active = 1;

  constructor(
    private solicitudService: SolicitudService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllProyectosCulminados();
  }

  solicitudesCuliminadas: Array<ISolitud> = [];
  namesCulimandos: Array<string> = [];

  getAllProyectosCulminados() {
    this.solicitudService.getSolicitudCulminadas().subscribe((data) => {
      this.solicitudesCuliminadas = data;

      this.namesCulimandos = this.solicitudesCuliminadas.map((soli) =>
        soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
      );
    });
  }

  viewModal(id: number) {
    // console.log(id);
    const ref = this.modalService.open(ViewRequestComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
    ref.result.then(
      (yes) => {
        console.log(yes);
      },
      (cancel) => {
        console.log(cancel);
      }
    );
  }
}
