import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { ListaUsuariosI } from 'src/app/models/users.interface';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})

export class MaintenanceComponent implements OnInit {

  public users:Array<any>=[];
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: any )=>{
      this.users = data;
      console.log(data);
    })
  }

}
