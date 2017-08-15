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

  fileChanged(event, preview): void {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.file = target.files[0];
    preview.src = window.URL.createObjectURL(this.file);
  }

  closeModal(): void {
    this.mediaService.turnOffUploadMode();
  }

  isImage(file: string): boolean {
    return this.mediaService.isImage(file);
  }

  onSubmit(event): void {
    let formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.mediaService.upload(formData);
    this.mediaService.turnOffUploadMode();
  } 

}
