import { ViewTemaComponent } from './../../core/components/view-tema/view-tema.component';
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
  estados = [];

  ngOnInit(): void {
    this.getAllTemas();
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.getAllProyectosEnCurso();
    this.getAllProyectosCulminados();
    this.getEstados();
  }

  getAllTemas() {
    this.carreraService.getAllTemasNoSeleccionado().subscribe((data) => {
      this.temas = data;
    });
  }

  onChangeTemas(value: any) {
    if (value.target.value !== 'todos') {
      this.carreraService
        .getTemaByIdCarreraNoSeleccionado(Number(value.target.value))
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
    this.solicitudService.getAllOnProject().subscribe((data) => {
      this.solicitudesNoCuliminadas = data;
      this.names = this.solicitudesNoCuliminadas.map((soli) =>
        soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
      );
    });
  }

  viewModalTema(id: number) {
    const ref = this.modalService.open(ViewTemaComponent, {
      size: 'lg',
    });
    ref.componentInstance.temaId = id;
  }

  //proyectos en cursos
  getEstados() {
    this.solicitudService.getStatusNotAllNotAdd().subscribe((data) => {
      this.estados = data;
    });
  }
  onChangeEstados(value: any) {
    if (value.target.value !== 'todos') {
      this.solicitudService
        .getProyectoByEstatusId(Number(value.target.value))
        .subscribe((data) => {
          this.solicitudesNoCuliminadas = data;
          this.names = this.solicitudesNoCuliminadas.map((soli) =>
            soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
          );
        });
    } else {
      this.getAllProyectosEnCurso();
    }
  }

  //proyecto culminados
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
    const ref = this.modalService.open(ViewRequestComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
  }
}
