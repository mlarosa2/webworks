import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../media';
import { MediaService } from '../media.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: [
    '../css/forms.css',
    './upload-media.component.css'
  ]
})
export class UploadMediaComponent implements OnInit {
  @Input() uploadFavicon: string;
  private file;
  constructor(private mediaService: MediaService,
              private adminService: AdminService) { }

  ngOnInit() {
  }

  fileChanged(event, preview): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.file = target.files[0];
    preview.src = window.URL.createObjectURL(this.file);
  }

  closeModal(): void {
    if (this.uploadFavicon) {
      this.adminService.setModalView(false);
    } else {
      this.mediaService.turnOffUploadMode();
    }
  }

  isImage(file: string): boolean {
    return this.mediaService.isImage(file);
  }

  onSubmit(event): void {
    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    if (this.uploadFavicon) {
      this.mediaService.uploadFavicon(formData);
    } else {
      this.mediaService.upload(formData);
    }

    this.mediaService.turnOffUploadMode();
  }

}
