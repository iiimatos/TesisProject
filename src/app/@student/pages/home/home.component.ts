import { ISolitud } from './../../../@core/models/carrera.interface';
import { UserService } from 'src/app/@core/services/user.service';
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
    private authService: AuthService
  ) {}
  solicitudes: Array<ISolitud> = [];
  names: Array<string> = [];

  ngOnInit(): void {
    this.authService.getMe().subscribe((data) => {
      this.solicitudService
        .getMySolicitudPendiente(data.id, '1')
        .subscribe((data) => {
          this.solicitudes = data;
          this.names = this.solicitudes.map((soli) =>
            soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
          );
          console.log(this.solicitudes);
        });
    });
  }
}
