import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/@core/services/solicitud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public requests:Array<any>=[];
  constructor(private solicitudService:SolicitudService, private router: Router) { }


  ngOnInit(): void {
    this.solicitudService.getAll().subscribe(data=>{
      this.requests = data;
      console.log(this.requests)
    })
  }

}
