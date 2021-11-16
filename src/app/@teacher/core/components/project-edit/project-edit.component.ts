import { ArrayType, ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICarrera, ISolitud } from 'src/app/@core/models/carrera.interface';
import { IUser } from 'src/app/@core/models/user.interface';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { EditProjectObsComponent } from '../edit-project-obs/edit-project-obs.component';
import { EditProjectUserComponent } from '../edit-project-user/edit-project-user.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  public users: any = [];
  public temas: any;
  public solicitudes: ISolitud | undefined;
  public historial: Array<any> = [];
  public linea: any;
  public asesor: any;
  public estado: any;
  form: FormGroup;
  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private carreraService: CarreraService,
    private modalService: NgbModal
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    let projectId = this.activateRoute.snapshot.paramMap.get('id');
    this.solicitudService.getAllByIdAndUsers(projectId).subscribe((data) => {
      let carreraId = data.carrera_id.id;
      console.log('#1', data);
      this.carreraService.getAllTemas().subscribe((data) => {
        this.temas = data;
      });
      this.carreraService.getLineaByIdCarrera(carreraId).subscribe((data) => {
        this.linea = data;
      });
      this.users = data.usuario_id;
      this.solicitudes = data;
      let usersId = data.usuario_id.map((usuario) => usuario.id);
      this.form.patchValue({
        asesor_id: data.asesor_id.id,
        carrera_id: data.carrera_id.id,
        linea_investigacion: data.linea_investigacion.id,
        tema_id: data.tema_id.id,
        datosProyecto: data.datosProyecto,
        estatus_id: data.estatus_id.id,
        usuario_id: usersId,
      });
    });

    this.carreraService.getMyHistorialRequest(projectId).subscribe((data) => {
      this.historial = data;
    });

    this.solicitudService.getAllAsesors().subscribe((data) => {
      this.asesor = data;
    });

    this.solicitudService.getAllStatus().subscribe((data) => {
      this.estado = data;
    });
  }

  goToBackList() {
    this.router.navigate(['teacher/topicbank/']);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      carrera_id: ['', [Validators.required]],
      tema_id: ['', [Validators.required]],
      usuario_id: [[]],
      asesor_id: ['', [Validators.required]],
      estatus_id: ['', [Validators.required]],
      nivelAcademico: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      institucionLabora: ['', [Validators.required]],
      datosProyecto: ['', [Validators.required, Validators.maxLength(200)]],
      linea_investigacion: ['', [Validators.required]],
    });
  }

  editUserModal(event: Event) {
    event.preventDefault();
    const modal = this.modalService.open(EditProjectUserComponent, {
      size: 'lg',
    });
    let projectId = this.activateRoute.snapshot.paramMap.get('id');
    modal.componentInstance.solicitudId = projectId;
  }

  editObsModal(event: Event) {
    event.preventDefault();
    const modal = this.modalService.open(EditProjectObsComponent, {
      size: 'lg',
    });
    let projectId = this.activateRoute.snapshot.paramMap.get('id');
    modal.componentInstance.solicitudId = projectId;
  }

  edit(event: Event) {
    event.preventDefault();
    let projectId = this.activateRoute.snapshot.paramMap.get('id');
    this.temas = {
      tema_id: this.form.controls['tema_id'].value,
      linea_investigacion: this.form.controls['linea_investigacion'].value,
      asesor_id: this.form.controls['asesor_id'].value,
    };

    this.solicitudService
      .editTopicRequest(projectId, this.temas)
      .subscribe((data) => {
        this.refresh();
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
