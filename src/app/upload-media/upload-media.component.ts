import { Component, OnInit } from '@angular/core';
import { Media } from '../media';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {
  private file;
  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }

  fileChanged(event): void {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.file = target.files[0];
  }

  closeModal(): void {
    this.mediaService.turnOffUploadMode();
  }

  onSubmit(event): void {
    let formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.mediaService.upload(formData);
    this.mediaService.turnOffUploadMode();
    this.mediaService.setFiles();
  } 

}
