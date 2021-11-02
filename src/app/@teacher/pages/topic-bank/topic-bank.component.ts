import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/@core/services/project.service';

@Component({
  selector: 'app-topic-bank',
  templateUrl: './topic-bank.component.html',
  styleUrls: ['./topic-bank.component.scss']
})
export class TopicBankComponent implements OnInit {
  active = 1;
  public projects:Array<any>=[];
  public status:Array<any>=[];
  constructor(private projectService:ProjectService, private router:Router) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(data=>{
      this.projects = data;
    })
   
    this.projectService.getStatus().subscribe(data=>{
      this.status = data;
      console.log(this.status);
    })
  }

}
