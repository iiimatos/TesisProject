import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarreraService } from 'src/app/@core/services/carrera.service';

import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { UserService } from 'src/app/@core/services/user.service';
import { validateAllFormFields } from 'src/app/@core/utils/form';

@Component({
  selector: 'app-edit-project-obs',
  templateUrl: './edit-project-obs.component.html',
  styleUrls: ['./edit-project-obs.component.scss'],
})
export class EditProjectObsComponent implements OnInit {
  solicitudId: number = 0;
  public estados: any;
  public status: any;
  public historial: any;
  form: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.solicitudService.getStatusNotAll().subscribe((data) => {
      this.estados = data;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      estatus: ['', [Validators.required]],
      solicitudes_tema: [''],
      observacion: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  edit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.historial = {
        estatus: this.form.controls['estatus'].value,
        solicitudes_tema: this.solicitudId,
        observacion: this.form.controls['observacion'].value,
      };
      this.status = {
        estatus_id: this.form.controls['estatus'].value,
      };
      this.solicitudService.addObsRequest(this.historial).subscribe((data) => {
        this.refresh();
      });
      this.solicitudService
        .editStatusRequest(this.solicitudId, this.status)
        .subscribe((data) => {
          this.refresh();
        });
    } else {
      validateAllFormFields(this.form);
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
