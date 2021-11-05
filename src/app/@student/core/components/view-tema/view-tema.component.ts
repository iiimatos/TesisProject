import { CarreraService } from './../../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';
import { ITema } from 'src/app/@core/models/carrera.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-tema',
  templateUrl: './view-tema.component.html',
  styleUrls: ['./view-tema.component.scss'],
})
export class ViewTemaComponent implements OnInit {
  temaId: number = 0;
  tema: ITema;

  constructor(
    private carreraService: CarreraService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.carreraService.getTemaById(this.temaId).subscribe((data) => {
      this.tema = data;
      console.log(this.tema);
    });
  }
}
