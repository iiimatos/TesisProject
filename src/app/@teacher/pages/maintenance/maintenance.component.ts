import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  public users: Array<any> = [];

  constructor(private userService: UserService, private router: Router) {}

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

  editarUsuario(id: any) {
    this.router.navigate(['teacher/maintenance/user-edit/', id]);
  }

  nuevoUsuario() {
    this.router.navigate(['teacher/maintenance/user-add/']);
  }
}
