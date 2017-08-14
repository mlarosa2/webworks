import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-single-media',
  templateUrl: './single-media.component.html',
  styleUrls: ['./single-media.component.css']
})
export class SingleMediaComponent implements OnInit {
  @Input() file: String
  private model: any;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.model = {
              name: this.file.substr(0, this.file.lastIndexOf('.')),
              ext: this.file.substr(this.file.lastIndexOf('.'))
          };
  }

  isImage(file: String): Boolean {
    return this.mediaService.isImage(file);
  }

  closeModal(): void {
    this.mediaService.turnOffSingleMode();
  }

  onSubmit(): void {
    this.mediaService.updateMedia(this.file, this.model);
  }

  deleteFile(file: String): void {
    this.mediaService.deleteFile(file);
  }

}
