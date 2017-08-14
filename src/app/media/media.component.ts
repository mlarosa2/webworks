import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service'; 

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }

  isUploadMode() {
    return this.mediaService.isUploadMode();
  }

  getFiles(): String[] {
    return this.mediaService.getFilesList();
  }

  isImage(file: String): Boolean {
    return this.mediaService.isImage(file);
  }

  viewFile(file: String): void {
    this.mediaService.turnOnSingleMode();
    this.mediaService.setSingleFile(file);
  }

  isSingleMode(): Boolean {
    return this.mediaService.isSingleMode();
  }

  getSingleFile(): String {
    return this.mediaService.getSingleFile();
  }

}
