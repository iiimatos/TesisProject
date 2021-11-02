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
  selectedStudents: Array<{ id: string }> = [];
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
    this.userService.getAllUsersNotAsignados().subscribe((data) => {
      this.listStudents = data;
    });

    this.solicitudService
      .getAllByIdAndUsers(this.solicitudId)
      .subscribe((data) => {
        this.solicitudes = data;
        this.selectedStudents = data.usuario_id.map((usuario) =>
          String(`${usuario.nombre} ${usuario.apellido} - ${usuario.username}`)
        );
        this.form.patchValue({
          carrera_id: data.carrera_id.id,
          tema_id: data.tema_id.id,
          nombre: data.asesor_id.nombre,
          telefono: data.asesor_id.telefono,
          nivelAcademico: data.asesor_id.nivelAcademico,
          correo: data.asesor_id.correo,
          institucionLabora: data.asesor_id.institucionLabora,
          datosProyecto: data.datosProyecto,
          linea_investigacion: data.linea_investigacion.id,
        });
        this.valueChange(data.carrera_id.id);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      carrera_id: ['', [Validators.required]],
      tema_id: ['', [Validators.required]],
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
    this.carreraService.getTemaByIdCarrera(value).subscribe((data) => {
      this.temas = data;
    });

    this.carreraService.getLineaByIdCarrera(value).subscribe((data) => {
      this.lineas = data;
    });
  }

  changeOption(value: boolean) {
    this.select = value;
    this.form.controls.tema_id.setValue('');
  }

  edit(event: Event) {
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
      this.solicitudService
        .editAsesor(this.asesor, this.solicitudes.asesor_id.id)
        .subscribe((data) => {
          this.solicitud = {
            asesor_id: data.id,
            carrera_id: this.form.controls['carrera_id'].value,
            datosProyecto: this.form.controls['datosProyecto'].value,
            linea_investigacion:
              this.form.controls['linea_investigacion'].value,
            tema_id: this.form.controls['tema_id'].value,
            usuario_id: this.selectedStudents,
          };
          this.solicitudService
            .editSolicitud(this.solicitud, this.solicitudes.id)
            .subscribe((data) => {
              console.log(data);
            });
        });
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}
