import { CarreraService } from './../../../@core/services/carrera.service';
import { IHistorial } from './../../../@core/models/carrera.interface';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private solicitudService: SolicitudService,
    private carreraService: CarreraService,
    private authService: AuthService
  ) {}
  historials: Array<IHistorial> = [];
  names: Array<string> = [];

  ngOnInit(): void {
    this.authService.getMe().subscribe((data) => {
      this.carreraService.getMyHistorial(data.id).subscribe((data) => {
        this.historials = data;
        this.names = this.historials.map((soli) =>
          soli.solicitudes_tema.usuario_id
            .map((usuario) => usuario.nombre)
            .join(', ')
        );
      });
    });
  }
}
