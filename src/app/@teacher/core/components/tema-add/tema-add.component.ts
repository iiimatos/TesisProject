import { validateAllFormFields } from './../../../../@core/utils/form';
import { CarreraService } from './../../../../@core/services/carrera.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {
  ICarrera,
  ILineaInvestigacion,
  ITema,
} from 'src/app/@core/models/carrera.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-tema-add',
  templateUrl: './tema-add.component.html',
  styleUrls: ['./tema-add.component.scss'],
})
export class TemaAddComponent implements OnInit {
  carreras: Array<ICarrera> = [];
  lineas: Array<ILineaInvestigacion> = [];
  form: FormGroup;
  tema: ITema;

  constructor(
    public modal: NgbModal,
    private carreraService: CarreraService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      tema: ['', [Validators.required]],
      alcance: ['', [Validators.required]],
      carrera_id: ['', [Validators.required]],
      linea_investigacion_id: ['', [Validators.required]],
      problematica: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCarrera();
  }

  getAllCarrera() {
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
  }

  onChange(value: any) {
    this.carreraService
      .getLineaByIdCarrera(Number(value.target.value))
      .subscribe((data) => {
        this.lineas = data;
      });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.authService.getMe().subscribe((data) => {
        this.tema = this.form.value;
        this.tema.profesor = data.id;
        this.carreraService.createTema(this.tema).subscribe((_) => {
          window.location.reload();
        });
      });
    } else {
      validateAllFormFields(this.form);
    }
  }
}
