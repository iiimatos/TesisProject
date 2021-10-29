import { FileService } from './../../../@core/services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  constructor(private fileService: FileService) {}
  files = [];
  fileSearch = '';

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe((data: any) => {
      this.files = data;
      console.log(this.files);
    });
  }

  searchFile() {
    this.fileService.getSearchFiles(this.fileSearch).subscribe((data: any) => {
      this.files = data;
    });
  }
}
