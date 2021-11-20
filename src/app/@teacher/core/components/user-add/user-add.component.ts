import { CarreraService } from './../../../../@core/services/carrera.service';
import { UserService } from 'src/app/@core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, IUser2 } from 'src/app/@core/models/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateAllFormFields } from 'src/app/@core/utils/form';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  private form: FormGroup;
  private user: any;
  private carreras: any;
  constructor(
    public modal:NgbModal,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) {
      this.buildForm();
    }

  ngOnInit(): void {
    this.userService.getAllCareers().subscribe((data) => {
      this.carreras = data;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: (0),
      carrera_id: ['', [Validators.required]],
    });
  }

  save(event: Event){
    event.preventDefault();
    if (this.form.valid) {
        this.user = this.form.value;
        this.userService.postUser(this.user).subscribe((data) => {
          console.log(data);
          window.location.reload();
        });
    } else {
      validateAllFormFields(this.form);
    }
  }
}
