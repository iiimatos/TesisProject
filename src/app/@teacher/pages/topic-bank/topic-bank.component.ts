import { TemaViewComponent } from './../../core/components/tema-view/tema-view.component';
import { CarreraService } from './../../../@core/services/carrera.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from './../../../@core/services/solicitud.service';
import { ISolitud, ITema } from './../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { ViewRequestComponent } from '../../core/components/view-request/view-request.component';
import { TemaEditComponent } from '../../core/components/tema-edit/tema-edit.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-bank',
  templateUrl: './topic-bank.component.html',
  styleUrls: ['./topic-bank.component.scss'],
})
export class TopicBankComponent implements OnInit {
  active = 1;
  public projects: Array<any> = [];
  estados = [];
  names: Array<string> = [];

  constructor(
    private solicitudService: SolicitudService,
    private modalService: NgbModal,
    private router: Router,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.getAllProyectosCulminados();
    this.getAllTemas();
    this.getAllOnProject();
    this.getStatus();
  }

  //tema pre-aprobados
  temas: Array<ITema> = [];
  getAllTemas() {
    this.carreraService.getAllTemasNoSeleccionado().subscribe((data) => {
      this.temas = data;
    });
  }

  getAllOnProject() {
    this.solicitudService.getAllOnProject().subscribe((data) => {
      this.projects = data;
      this.names = this.projects.map((soli) =>
        soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
      );
    });
  }

  viewModalTema(id: number) {
    const ref = this.modalService.open(TemaViewComponent, {
      size: 'lg',
    });
    ref.componentInstance.temaId = id;
  }
  editModalTema(id: number) {
    const ref = this.modalService.open(TemaEditComponent, {
      size: 'lg',
    });
    ref.componentInstance.temaId = id;
  }

  deleteTema(id: number) {
    Swal.fire({
      title: 'Deseas eliminar este tema?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carreraService.deleteTemaById(id).subscribe((_) => {
          Swal.fire(
            'Eliminado!',
            'Tema fue eliminar correctamente!.',
            'success'
          );
          this.getAllTemas();
        });
      }
    });
  }

  //proyecto en curso

  getStatus() {
    this.solicitudService.getStatusNotAll().subscribe((data) => {
      this.estados = data;
    });
  }

  onChangeEstados(value: any) {
    if (value.target.value !== 'todos') {
      this.solicitudService
        .getProyectoByEstatusId(Number(value.target.value))
        .subscribe((data) => {
          this.projects = data;
          this.names = this.projects.map((soli) =>
            soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
          );
        });
    } else {
      this.getAllOnProject();
    }
  }

  //proyectos culmiados
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
  }

  editarProyecto(id: number) {
    this.router.navigate(['teacher/topicbank/project-edit/', id]);
  }
}
