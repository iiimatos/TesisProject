import { FileService } from './../../../@core/services/file.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
    this.getFiles();
  }

  getFiles() {
    this.fileService.getAllFiles().subscribe((data: any) => {
      this.files = data;
    });
  }

  delete(idFile: number) {
    Swal.fire({
      title: 'Deseas eliminar este archivo?',
      text: 'No hay vuelta atras!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.deleteFiles(idFile).subscribe((_) => {
          Swal.fire(
            'Eliminado!',
            'Archivo fue eliminar correctamente!.',
            'success'
          );
          this.getFiles();
        });
      }
    });
  }
}
