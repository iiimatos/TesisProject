import { CarreraService } from './../../../../@core/services/carrera.service';
import { ICarrera } from './../../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ILineaInvestigacion,
  ISolitud,
  ITema,
} from 'src/app/@core/models/carrera.interface';
import { AuthService } from 'src/app/@core/services/auth.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { IUser } from 'src/app/@core/models/user.interface';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
})
export class EditRequestComponent implements OnInit {
  solicitudId: number = 0;
  solicitudes: ISolitud | undefined;
  students: Array<{ name: string }> = [{ name: '' }];
  carreras: Array<ICarrera> = [];
  temas: Array<ITema> = [];
  lineas: Array<ILineaInvestigacion> = [];
  select: boolean = true;
  listStudents: Array<IUser> = [];
  selectedStudents: Array<{ id: string }> = [];

  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService,
    private carreraService: CarreraService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitudes = data;
      });
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.userService.getAllUsersNotAsignados().subscribe((data) => {
      this.listStudents = data;
    });
  }

  removeValue(i: number) {
    if (this.students.length > 1) {
      this.students.splice(i, 1);
    }
  }

  addValue() {
    if (this.students.length < 3) {
      this.students.push({ name: '' });
    }
  }

  onChange(value: any) {
    this.carreraService
      .getTemaByIdCarrera(Number(value.target.value))
      .subscribe((data) => {
        this.temas = data;
      });

    this.carreraService
      .getLineaByIdCarrera(Number(value.target.value))
      .subscribe((data) => {
        this.lineas = data;
      });
  }

  changeOption(value: boolean) {
    console.log(value);

    this.select = value;
  }
}
