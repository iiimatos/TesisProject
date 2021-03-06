import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarreraService } from 'src/app/@core/services/carrera.service';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-edit-project-user',
  templateUrl: './edit-project-user.component.html',
  styleUrls: ['./edit-project-user.component.scss']
})
export class EditProjectUserComponent implements OnInit {
  public solicitudId: number = 0;
  public listStudents: Array<any> = [];
  public form :FormGroup;
  public users: any = [];
  constructor(
    private userService: UserService,
    public modal: NgbActiveModal,
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.listStudents = data;
    });
    this.solicitudService.getAllByIdAndUsers(this.solicitudId).subscribe((data)=>{
      let usersId = data.usuario_id.map((usuario)=> usuario.id);
      this.form.patchValue({
        usuario_id: usersId
      })
    })
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      usuario_id:[[]]
    })
  }

  edit(event:Event){
    event.preventDefault();
    this.users = {usuario_id: this.form.controls['usuario_id'].value}
    
    this.solicitudService.editUsersRequest(this.solicitudId, this.users).subscribe((data)=>{
      this.refresh();
    })

  }
  
  refresh(): void {
    window.location.reload();
  }

}
