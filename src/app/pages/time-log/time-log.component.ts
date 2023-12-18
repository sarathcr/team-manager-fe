import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { log } from 'console';
import { ApiService } from '../../core/services/api.service';
import { TimeLogService } from './services/time-log.service';
import { EXPORT_EXCEL } from '../../core/constants/api';
import { TimeLog } from './models/time-log.model';

@Component({
  selector: 'app-time-log',
  standalone: true,
  imports: [PageTitleComponent, FileUploadComponent],
  templateUrl: './time-log.component.html',
  styleUrl: './time-log.component.scss',
  providers: [TimeLogService],
})
export class TimeLogComponent<T extends { id: number }> {
  public fileData!: File;

  constructor(protected service: TimeLogService<T>) {}

  // PUBLIC

  public onUpload(data: File) {
    const URL = `${EXPORT_EXCEL}`;
    this.fileData = data;
    this.service.uploadFile(this.fileData, URL).subscribe({
      next: (res: T) => {
        console.log('Time Log', res);
      },
    });
    console.log(this.fileData);
  }
}
