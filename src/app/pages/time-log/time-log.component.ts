import { Component } from '@angular/core';
import { EXPORT_EXCEL } from '../../core/constants/api';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { TimeLogService } from './services/time-log.service';
import { log } from 'console';
import { TableDataModel } from '../../shared/models/table-data.model';

@Component({
  selector: 'app-time-log',
  standalone: true,
  imports: [PageTitleComponent, FileUploadComponent, TableComponent],
  templateUrl: './time-log.component.html',
  styleUrl: './time-log.component.scss',
  providers: [TimeLogService],
})
export class TimeLogComponent<T extends { id: number }> {
  public fileData!: File;
  public tableData!: TableDataModel;

  constructor(protected service: TimeLogService<T>) {}

  // PUBLIC
  public onUpload(data: File) {
    const URL = `${EXPORT_EXCEL}`;
    this.fileData = data;
    this.service.uploadFile(this.fileData, URL).subscribe({
      next: (res: any) => {
        console.log('Time Log', res);
        this.tableData = res;
      },
    });
  }
}
