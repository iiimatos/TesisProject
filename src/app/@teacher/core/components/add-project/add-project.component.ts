import { FileService } from './../../../../@core/services/file.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  constructor(public modal: NgbModal, private fileService: FileService) {}
  uploadedFiles: Array<File> = null;

  ngOnInit(): void {}

  onUpload() {
    const formData: FormData = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'files',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.fileService.uploadFiles(formData).subscribe((data) => {
      console.log(data);
    });
  }

  onFileChange(event) {
    this.uploadedFiles = event.target.files;
    console.log(this.uploadedFiles);
  }
}
