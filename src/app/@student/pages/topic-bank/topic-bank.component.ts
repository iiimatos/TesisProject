import { ViewRequestComponent } from './../../core/components/view-request/view-request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ITema,
  ICarrera,
  ISolitud,
} from './../../../@core/models/carrera.interface';
import { CarreraService } from './../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-topic-bank',
  templateUrl: './topic-bank.component.html',
  styleUrls: ['./topic-bank.component.scss'],
})
export class TopicBankComponent implements OnInit {
  active = 1;
  constructor(
    private carreraService: CarreraService,
    private solicitudService: SolicitudService,
    private modalService: NgbModal
  ) {}

  temas: Array<ITema> = [];
  carreras: Array<ICarrera> = [];
  temaSearch = '';

  ngOnInit(): void {
    this.getAllTemas();
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.getAllProyectosEnCurso();
    this.getAllProyectosCulminados();
  }

  getAllTemas() {
    this.carreraService.getAllTemas().subscribe((data) => {
      this.temas = data;
    });
  }

  onChange(value: any) {
    if (value.target.value !== 'todos') {
      this.carreraService
        .getTemaByIdCarrera(Number(value.target.value))
        .subscribe((data) => {
          this.temas = data;
        });
    } else {
      this.getAllTemas();
    }
  }

  //temas - preaprobados
  solicitudesNoCuliminadas: Array<ISolitud> = [];
  names: Array<string> = [];

  getAllProyectosEnCurso() {
    this.solicitudService.getSolicitudNotCulminadas().subscribe((data) => {
      this.solicitudesNoCuliminadas = data;
      console.log(this.solicitudesNoCuliminadas);

      this.names = this.solicitudesNoCuliminadas.map((soli) =>
        soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
      );
    });
  }

  //temas - preaprobados
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
