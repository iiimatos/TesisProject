import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/@core/models/user.interface';
import { UserService } from 'src/app/@core/services/user.service';
import {
  IAsesor,
  ILineaInvestigacion,
  ITema,
} from './../../../../@core/models/carrera.interface';
import { CarreraService } from './../../../../@core/services/carrera.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {
  ICarrera,
  ISolitud,
} from './../../../../@core/models/carrera.interface';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent implements OnInit {
  constructor(
    public modal: NgbModal,
    private carreraService: CarreraService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService
  ) {
    this.buildForm();
  }

  students: Array<IUser> = [{ id: '' }];
  listStudents: Array<IUser> = [];
  selectedStudents: Array<IUser> = [];
  carreras: Array<ICarrera> = [];
  temas: Array<ITema> = [];
  lineas: Array<ILineaInvestigacion> = [];
  select: boolean = true;
  asesor: IAsesor;
  solicitud: ISolitud;
  form: FormGroup;

  ngOnInit(): void {
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.userService.getAllUsersNotAsignados().subscribe((data) => {
      this.listStudents = data;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      carrera_id: ['', [Validators.required]],
      tema_id: ['', [Validators.required]],
      usuario_id: [[], [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      nivelAcademico: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      institucionLabora: ['', [Validators.required]],
      datosProyecto: ['', [Validators.required, Validators.maxLength(200)]],
      linea_investigacion: ['', [Validators.required]],
    });
  }

  removeValue(i: number) {
    if (this.students.length > 1) {
      this.students.splice(i, 1);
    }
  }

  addValue() {
    if (this.students.length < 3) {
      this.students.push({ id: '' });
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
    this.select = value;
    this.form.controls.tema_id.setValue('');
  }

  save(event: Event) {
    event.preventDefault();
    this.form.controls.usuario_id.setValue(
      this.selectedStudents.map((value) => String(value))
    );
    if (this.form.valid) {
      this.asesor = {
        correo: this.form.controls['correo'].value,
        institucionLabora: this.form.controls['institucionLabora'].value,
        telefono: this.form.controls['telefono'].value,
        nombre: this.form.controls['nombre'].value,
        nivelAcademico: this.form.controls['nivelAcademico'].value,
      };
      this.solicitudService.createAsesor(this.asesor).subscribe((data) => {
        this.solicitud = {
          asesor_id: data.id,
          carrera_id: this.form.controls['carrera_id'].value,
          datosProyecto: this.form.controls['datosProyecto'].value,
          linea_investigacion: this.form.controls['linea_investigacion'].value,
          tema_id: this.form.controls['tema_id'].value,
          usuario_id: this.selectedStudents,
        };
        this.solicitudService
          .createSolicitud(this.solicitud)
          .subscribe((data) => {
            console.log(data);
          });
      });
    }
  }
}
