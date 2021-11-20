import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { UserService } from 'src/app/@core/services/user.service';
import Swal from 'sweetalert2';
import { UserAddComponent } from '../../core/components/user-add/user-add.component';
import { UserEditComponent } from '../../core/components/user-edit/user-edit.component';
import { UserViewComponent } from '../../core/components/user-view/user-view.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  public users: Array<any> = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private solicitudService: SolicitudService,
    private modalService: NgbModal,
    private carreraService: CarreraService
    ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUsuario(id: any) {
    Swal.fire({
      title: 'Deseas eliminar este usuario?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((_) => {
          this.getAllUsers();
        });
        Swal.fire(
          'Eliminado!',
          'Usuario fue eliminado correctamente!.',
          'success'
        );
      }
    });
  }

  viewModalUser(id: number) {
    const ref = this.modalService.open(UserViewComponent, {
      size: 'lg',
    });
    ref.componentInstance.userId = id;
  }

  editModalUser(id: number) {
    const ref = this.modalService.open(UserEditComponent, {
      size: 'lg',
    });
    ref.componentInstance.userId = id;
  }

}
