import { ITema } from './../../../../@core/models/carrera.interface';
import { CarreraService } from './../../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tema-view',
  templateUrl: './tema-view.component.html',
  styleUrls: ['./tema-view.component.scss'],
})
export class TemaViewComponent implements OnInit {
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
