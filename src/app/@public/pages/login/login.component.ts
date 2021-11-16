import { validateAllFormFields } from './../../../@core/utils/form';
import { getMessageRequest } from './../../../@core/utils/message';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ILoginUser } from '../../../@core/models/user.interface';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { basicAlert } from 'src/app/@Shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@Shared/alerts/values.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  form: FormGroup;
  loading = false;

  private buildForm() {
    this.form = this.formBuilder.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.loading = true;
      const identifier = this.form.controls['identifier'].value;
      const password = this.form.controls['password'].value;
      this.authService.login(identifier, password).subscribe(
        (data: any) => {
          if (data.jwt && data.user !== null) {
            basicAlert(TYPE_ALERT.SUCCESS, 'Sesion Iniciada');
            this.authService.setSession(data.jwt);
            this.loading = false;
            if (data.user.role.name === 'Student') {
              this.router.navigate(['/student']);
            } else {
              this.router.navigate(['/teacher']);
            }
            return;
          }
        },
        (error) => {
          this.loading = false;
          basicAlert(
            TYPE_ALERT.ERROR,
            getMessageRequest(error.error.data[0].messages[0].message)
          );
        }
      );
    } else {
      validateAllFormFields(this.form);
    }
  }
}
