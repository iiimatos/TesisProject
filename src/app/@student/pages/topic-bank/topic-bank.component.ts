import { ITema, ICarrera } from './../../../@core/models/carrera.interface';
import { CarreraService } from './../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-bank',
  templateUrl: './topic-bank.component.html',
  styleUrls: ['./topic-bank.component.scss'],
})
export class TopicBankComponent implements OnInit {
  active = 1;
  constructor(private carreraService: CarreraService) {}

  temas: Array<ITema> = [];
  carreras: Array<ICarrera> = [];

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
}
