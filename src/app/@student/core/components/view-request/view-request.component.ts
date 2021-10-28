import { ISolitud } from './../../../../@core/models/carrera.interface';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss'],
})
export class ViewRequestComponent implements OnInit {
  solicitudId: number = 0;
  solicitudes: ISolitud | undefined;

  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitudes = data;
        console.log(data);
      });
  }
}
