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
    const ext = file.substr(file.lastIndexOf('.') + 1);
    const images = ['jpg', 'png', 'svg', 'gif'];
    return images.includes(ext);
  }

}
