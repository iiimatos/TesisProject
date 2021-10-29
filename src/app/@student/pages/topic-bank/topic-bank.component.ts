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
    private solicitudService: SolicitudService
  ) {}

  temas: Array<ITema> = [];
  carreras: Array<ICarrera> = [];
  temaSearch = '';

  ngOnInit(): void {
    this.getAllTemas();
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
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
  solicitudes: Array<ISolitud> = [];
  getAllProyectosEnCurso() {}

  getAllProyectTerminados() {}
}
