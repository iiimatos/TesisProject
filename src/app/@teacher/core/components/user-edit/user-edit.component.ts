import { CarreraService } from './../../../../@core/services/carrera.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/@core/models/user.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { validateAllFormFields } from 'src/app/@core/utils/form';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userId : number = 0
  public datosUsuarios: any;
  public carreras: any;
  public form: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    private formBuilder: FormBuilder

  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.userService.getAllCareers().subscribe((data) => {
      this.carreras = data;
    });
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.datosUsuarios = data;
      this.form.patchValue({
        nombre: this.datosUsuarios.nombre,
        apellido: this.datosUsuarios.apellido,
        username: this.datosUsuarios.username,
        email: this.datosUsuarios.email,
        carrera_id: this.datosUsuarios.carrera_id.id,
      });
    });
  }
  
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      carrera_id: ['', [Validators.required]],
    });
  }

  save(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      this.datosUsuarios = this.form.value;
      this.userService.putUser(this.datosUsuarios, this.userId).subscribe((data)=>{
        window.location.reload();
      })
    } else {
      validateAllFormFields(this.form);
    }
  }
}
