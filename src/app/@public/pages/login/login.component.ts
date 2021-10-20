import { ILoginUser } from './../../../@core/models/users.interface';
import { Component  } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { basicAlert } from 'src/app/@Shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@Shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  user:ILoginUser = {
    identifier: '',
    password: ''
  };

  login() {
    const {identifier, password} = this.user;
    this.authService.login(identifier, password).subscribe((data : any)=> {
      console.log(data);
      if( data.jwt && data.user !== null){
        basicAlert(TYPE_ALERT.SUCCESS, "Sesion Iniciada");
        return;
      }
      alert("Noo");
    })
  }

}
