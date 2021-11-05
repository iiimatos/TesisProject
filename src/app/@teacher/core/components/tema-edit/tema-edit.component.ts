import { validateAllFormFields } from './../../../../@core/utils/form';
import { AuthService } from './../../../../@core/services/auth.service';
import { CarreraService } from './../../../../@core/services/carrera.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ITema,
  ILineaInvestigacion,
  ICarrera,
} from './../../../../@core/models/carrera.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.scss'],
})
export class TemaEditComponent implements OnInit {
  carreras: Array<ICarrera> = [];
  lineas: Array<ILineaInvestigacion> = [];
  form: FormGroup;
  tema: ITema;
  temaId: number = 0;

  constructor(
    public modal: NgbActiveModal,
    private carreraService: CarreraService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      tema: ['', [Validators.required]],
      alcance: ['', [Validators.required]],
      carrera_id: ['', [Validators.required]],
      linea_investigacion: ['', [Validators.required]],
      problematica: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCarrera();
    this.carreraService.getTemaById(this.temaId).subscribe((data) => {
      this.getLinea(data.linea_investigacion.id);
      this.form.patchValue({
        tema: data.tema,
        alcance: data.alcance,
        carrera_id: data.carrera_id.id,
        linea_investigacion: data.linea_investigacion.id,
        problematica: data.problematica,
      });
    });
  }

  getAllCarrera() {
    this.carreraService.getAllCarreras().subscribe((data) => {
      this.carreras = data;
    });
  }

  onChange(value: any) {
    this.getLinea(value.target.value);
  }

  getLinea(value: number) {
    this.carreraService.getLineaByIdCarrera(value).subscribe((data) => {
      this.lineas = data;
    });
  }

  edit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.tema = this.form.value;
      this.carreraService.editTema(this.tema, this.temaId).subscribe((_) => {
        window.location.reload();
      });
    } else {
      validateAllFormFields(this.form);
    }
  }
}
