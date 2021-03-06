import { ViewRequestComponent } from './../../core/components/view-request/view-request.component';
import { EditRequestComponent } from './../../core/components/edit-request/edit-request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISolitud } from './../../../@core/models/carrera.interface';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import Swal from 'sweetalert2';
import { CarreraService } from 'src/app/@core/services/carrera.service';

@Component({
  selector: 'app-topic-request',
  templateUrl: './topic-request.component.html',
  styleUrls: ['./topic-request.component.scss'],
})
export class TopicRequestComponent implements OnInit {
  constructor(
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private modalService: NgbModal,
    private carreraService: CarreraService,

  ) { }

  solicitudes: Array<ISolitud> = [];
  names: Array<string> = [];

  ngOnInit(): void {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.authService.getMe().subscribe((data) => {
      this.solicitudService.getAllByUsers(data.id).subscribe((data) => {
        console.log(data);

        this.solicitudes = data;
        this.names = this.solicitudes.map((soli) =>
          soli.usuario_id.map((usuario) => usuario.nombre).join(', ')
        );
      });
    });
  }

  editModal(id: number) {
    const ref = this.modalService.open(EditRequestComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
    ref.result.then(
      (yes) => {
        this.getSolicitudes();
      },
      (cancel) => {
        console.log(cancel);
      }
    );
  }

  viewModal(id: number) {
    // console.log(id);
    const ref = this.modalService.open(ViewRequestComponent, {
      size: 'lg',
    });
    ref.componentInstance.solicitudId = id;
    ref.result.then(
      (yes) => {
        console.log(yes);
      },
      (cancel) => {
        console.log(cancel);
      }
    );
  }

  delete(idSoli: number, idAsesor: number, i: number) {
    Swal.fire({
      title: 'Deseas eliminar esta solicitud?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.deleteSolicitudes(idSoli).subscribe((_) => {
          this.solicitudService.deleteAsesor(idAsesor).subscribe((_) => {
            this.getSolicitudes();
          });
        });

        this.carreraService
          .editTemaSeleccionadoValue(this.solicitudes[i].tema_id?.id, {
            seleccionado: false,
          })
          .subscribe((_) => { });
        Swal.fire(
          'Eliminado!',
          'Solicitud fue eliminar correctamente!.',
          'success'
        );
      }
    });
  }
}
