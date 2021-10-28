import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from 'src/app/@core/models/carrera.interface';
import { AuthService } from 'src/app/@core/services/auth.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
})
export class EditRequestComponent implements OnInit {
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
      });
  }
}