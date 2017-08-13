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

}
