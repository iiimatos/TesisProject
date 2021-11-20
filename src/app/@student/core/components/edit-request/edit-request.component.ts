import { validateAllFormFields } from './../../../../@core/utils/form';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { CarreraService } from './../../../../@core/services/carrera.service';
import {
  ICarrera,
  IAsesor,
} from './../../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ILineaInvestigacion,
  ISolitud,
  ITema,
} from 'src/app/@core/models/carrera.interface';
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
  form: FormGroup;
  asesor: IAsesor;
  solicitud: ISolitud;

  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService,
    private carreraService: CarreraService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.listStudents = data;
    });

    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitudes = data;
        let usersId = data.usuario_id.map((usuario) => usuario.id);
        this.form.patchValue({
          nombre: data.asesor_id.nombre,
          telefono: data.asesor_id.telefono,
          nivelAcademico: data.asesor_id.nivelAcademico,
          correo: data.asesor_id.correo,
          institucionLabora: data.asesor_id.institucionLabora,
          datosProyecto: data.datosProyecto,
          linea_investigacion: data.linea_investigacion.id,
          usuario_id: usersId,
        });
        this.valueChange(data.carrera_id.id);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usuario_id: [[]],
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
      this.students.push({ name: '' });
    }
  }

  onChange(value: any) {
    this.valueChange(Number(value.target.value));
  }

  valueChange(value: number) {
    this.carreraService
      .getTemaByIdCarreraNoSeleccionado(value)
      .subscribe((data) => {
        this.temas = data;
      });

    this.carreraService.getLineaByIdCarrera(value).subscribe((data) => {
      this.lineas = data;
    });
  }

  edit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.asesor = {
        correo: this.form.controls['correo'].value,
        institucionLabora: this.form.controls['institucionLabora'].value,
        telefono: this.form.controls['telefono'].value,
        nombre: this.form.controls['nombre'].value,
        nivelAcademico: this.form.controls['nivelAcademico'].value,
      };
      this.solicitudService
        .editAsesor(this.asesor, this.solicitudes.asesor_id.id)
        .subscribe((data) => {
          this.solicitud = {
            asesor_id: data.id,
            datosProyecto: this.form.controls['datosProyecto'].value,
            linea_investigacion:
              this.form.controls['linea_investigacion'].value,
            usuario_id: this.form.controls['usuario_id'].value,
          };
          this.solicitudService
            .editSolicitud(this.solicitud, this.solicitudes.id)
            .subscribe((data) => {
              window.location.reload();
            });
        });
    } else {
      validateAllFormFields(this.form);
    }
  }
}
