import {
  ILineaInvestigacion,
  ITema,
} from './../../../../@core/models/carrera.interface';
import { CarreraService } from './../../../../@core/services/carrera.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ICarrera } from './../../../../@core/models/carrera.interface';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent implements OnInit {
  constructor(public modal: NgbModal, private carreraService: CarreraService) {}

  students: Array<{ name: string }> = [{ name: '' }];
  carreras: Array<ICarrera> = [];
  temas: Array<ITema> = [];
  lineas: Array<ILineaInvestigacion> = [];

  ngOnInit(): void {
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
  }

  removeValue(i: number) {
    if (this.students.length > 1) {
      this.students.splice(i, 1);
    }
  }

  addValue() {
    if (this.students.length < 3) {
      this.students.push({ name: '' });
    }
  }

  onChange(value: any) {
    this.carreraService
      .getTemaByIdCarrera(Number(value.target.value))
      .subscribe((data) => {
        this.temas = data;
      });

    this.carreraService
      .getLineaByIdCarrera(Number(value.target.value))
      .subscribe((data) => {
        this.lineas = data;
      });
  }
}
